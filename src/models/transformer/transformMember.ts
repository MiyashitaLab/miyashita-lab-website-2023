import { Entry } from "contentful";

import { MemberDefaultImg } from "@/lib/publicImage";
import { TypeMemberFields, TypeMemberSkeleton } from "@/models/contentful";
import { MemberModel, PartialMemberModel } from "@/models/models";
import { transformAuthorModel } from "@/models/transformer/transformAuthor";
import { transformCMSImage } from "@/models/transformer/transformCMSImage";

export const transformPartialMemberModal = (
  member: Entry<TypeMemberSkeleton, "WITHOUT_UNRESOLVABLE_LINKS", string>
): PartialMemberModel => {
  const role = displayRole({
    role: member.fields.role,
    schoolYear: member.fields.schoolYear,
    graduatedYear: member.fields.graduatedYear,
    enrolledYear: member.fields.enrolledYear,
    status: member.fields.status,
  });
  //TODO 要見直し
  const roleSortOrder =
    member.fields.role === "professor" ? -9999 : -member.fields.enrolledYear;

  const thumbnailAsset = member.fields.thumbnail?.fields.file;
  return {
    name: member.fields.name,
    slug: member.fields.slug ?? member.fields.name,
    thumbnail: thumbnailAsset
      ? transformCMSImage(thumbnailAsset)
      : MemberDefaultImg,
    displayRole: role,
    roleSortOrder: roleSortOrder,
  };
};

const displayRole = ({
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

  const calcStatus =
    status === "auto" ? calsStatus(enrolledYear, graduatedYear) : status;

  if (calcStatus === "enrolled") {
    //在学中

    return schoolYear === "auto"
      ? calcSchoolYear(enrolledYear, graduatedYear)
      : schoolYear;
  } else {
    //卒業 or 退学済み

    if (calcStatus === "bachelor") {
      return `${graduatedYear}年度学部卒業`;
    }
    if (calcStatus === "master") {
      return `${graduatedYear}年度修士卒業`;
    }
    if (calcStatus === "doctor") {
      return `${graduatedYear}年度博士卒業`;
    }
    if (calcStatus === "withdrawn") {
      return `${graduatedYear}年度退学`;
    }

    throw new Error(`Unexpected status: ${calcStatus}`);
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

const calsStatus = (
  enrolledYear: number,
  graduatedYear: number,
  now: Date = new Date()
): "enrolled" | "bachelor" | "doctor" | "master" | "withdrawn" => {
  const nowFiscalYear = getJapaneseFiscalYear(now);

  //在学中
  if (graduatedYear < nowFiscalYear) {
    return "enrolled";
  }

  const schoolYear = nowFiscalYear - enrolledYear + 1;

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
const getJapaneseFiscalYear = (date: Date): number => {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  return month < 4 ? year - 1 : year;
};

export const transformMemberModel = (
  member: Entry<TypeMemberSkeleton, "WITHOUT_UNRESOLVABLE_LINKS", string>
): MemberModel => {
  return {
    ...transformPartialMemberModal(member),
    author: member.fields.author && transformAuthorModel(member.fields.author),
    institution: member.fields.institution,
    contentMd: member.fields.content,
    achievementMd: member.fields.achievement,
  };
};
