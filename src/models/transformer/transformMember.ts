import { Entry } from "contentful";

import { MemberDefaultImg } from "@/lib/publicImage";
import { TypeMemberFields, TypeMemberSkeleton } from "@/models/contentful";
import { MemberModel, PartialMemberModel } from "@/models/models";
import { transformAuthorModel } from "@/models/transformer/transformAuthor";
import { transformCMSImage } from "@/models/transformer/transformCMSImage";

export const transformPartialMemberModal = (
  member: Entry<TypeMemberSkeleton, "WITHOUT_UNRESOLVABLE_LINKS", string>
): PartialMemberModel => {
  const {
    name,
    slug,
    thumbnail,
    role,
    schoolYear,
    graduatedYear,
    enrolledYear,
    status,
  } = member.fields;

  const nowFiscalYear = getJapaneseFiscalYear(new Date());
  const complementedStatus =
    status !== "auto"
      ? status
      : complementStatus(enrolledYear, graduatedYear, nowFiscalYear);

  const displayRole = getDisplayRole({
    role: role,
    schoolYear: schoolYear,
    graduatedYear: graduatedYear,
    enrolledYear: enrolledYear,
    status: complementedStatus,
  });
  //TODO 要見直し
  const roleSortOrder = role === "professor" ? 9999 : -enrolledYear;

  const thumbnailAsset = thumbnail?.fields.file;
  return {
    name: name,
    slug: slug,
    thumbnailImg: thumbnailAsset
      ? transformCMSImage(thumbnailAsset)
      : MemberDefaultImg,
    displayRole: displayRole,
    roleSortOrder: roleSortOrder,
    active: complementedStatus === "enrolled",
  };
};

export const transformMemberModel = (
  member: Entry<TypeMemberSkeleton, "WITHOUT_UNRESOLVABLE_LINKS", string>
): MemberModel => {
  const { author, institution, content, achievement } = member.fields;
  return {
    ...transformPartialMemberModal(member),
    author: (author && transformAuthorModel(author)) ?? null,
    institution: institution,
    contentMd: content ?? "",
    achievementMd: achievement ?? "",
  };
};

const getDisplayRole = ({
  role,
  schoolYear,
  graduatedYear,
  enrolledYear,
  status,
}: {
  role: TypeMemberFields["role"]["values"];
  schoolYear: TypeMemberFields["schoolYear"]["values"];
  graduatedYear: TypeMemberFields["graduatedYear"]["values"];
  enrolledYear: TypeMemberFields["enrolledYear"]["values"];
  status: TypeMemberFields["status"]["values"];
}): string => {
  if (role === "professor") {
    return "教員";
  }

  switch (status) {
    case "enrolled":
      return schoolYear === "auto"
        ? calcSchoolYear(enrolledYear, graduatedYear)
        : schoolYear;
    case "bachelor":
      return `${graduatedYear}年度学部卒業`;
    case "master":
      return `${graduatedYear}年度修士卒業`;
    case "doctor":
      return `${graduatedYear}年度博士卒業`;
    case "withdrawn":
      return `${graduatedYear}年度退学`;
    default:
      throw new Error("Invalid status");
  }
};

const calcSchoolYear = (
  enrolledYear: number,
  graduatedYear: number,
  now: Date = new Date()
): "B1" | "B2" | "B3" | "B4" | "D1" | "D2" | "D3" | "M1" | "M2" | "unknown" => {
  const fiscalYear = getJapaneseFiscalYear(now);
  const schoolYear = fiscalYear - enrolledYear + 1;
  switch (schoolYear) {
    case 1:
      return "B1";
    case 2:
      return "B2";
    case 3:
      return "B3";
    case 4:
      return "B4";
    case 5:
      return "M1";
    case 6:
      return "M2";
    case 7:
      return "D1";
    case 8:
      return "D2";
    case 9:
      return "D3";
    default:
      return "unknown";
  }
};

export const complementStatus = (
  enrolledYear: number,
  graduatedYear: number,
  nowFiscalYear: number
): "enrolled" | "bachelor" | "doctor" | "master" | "withdrawn" => {
  //在学中
  if (nowFiscalYear <= graduatedYear) {
    return "enrolled";
  }

  const schoolYear = graduatedYear - enrolledYear + 1;

  //9年で卒業
  if (9 <= schoolYear) {
    return "doctor";
  }

  //6年で卒業
  if (6 <= schoolYear) {
    return "master";
  }

  //4年で卒業
  if (4 <= schoolYear) {
    return "bachelor";
  }

  //退学
  return "withdrawn";
};

/**
 * 日本の年度を計算する
 * @param date
 */
export const getJapaneseFiscalYear = (date: Date): number => {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  return month < 4 ? year - 1 : year;
};
