import { Faker } from "@faker-js/faker";

import { CMSImageWithSize } from "@/components/feature/wrapImage";
import {
  AuthorModel,
  MemberModel,
  NewsModel,
  PaperModel,
  ProjectModel,
} from "@/models/models";
import { paperTypeMap } from "@/models/transformer/transformPaper";

export const imageMock = (faker: Faker): CMSImageWithSize => {
  const { width, height } = faker.helpers.arrayElement([
    { width: 800, height: 800 },
    { width: 1200, height: 630 },
    { width: 1200, height: 800 },
    { width: 800, height: 450 },
  ]);

  return {
    src: faker.image.urlPicsumPhotos({ width, height }),
    width: width,
    height: height,
  };
};

export const authorModelMock = (faker: Faker): AuthorModel => {
  const firstNameEn = faker.person.firstName();
  const lastNameEn = faker.person.lastName();
  const firstNameJa = `ja-${firstNameEn}`;
  const lastNameJa = `ja-${lastNameEn}`;
  return {
    fullName: `${lastNameEn} ${firstNameEn}`,
    familyName: {
      ja: lastNameJa,
      en: lastNameEn,
    },
    givenName: {
      ja: firstNameJa,
      en: firstNameEn,
    },
  };
};

export const memberModelMock = (faker: Faker): MemberModel => {
  const roleWithOrder = faker.helpers.arrayElement([
    { role: "教員", order: 0 },
    { role: "M1", order: 1 },
    { role: "B3", order: 2 },
    { role: "2022年度学部卒業", order: 3 },
  ]);

  return {
    slug: faker.lorem.slug(),
    name: faker.person.fullName(),
    thumbnail: {
      src: faker.image.urlPicsumPhotos({
        width: 400,
        height: 400,
      }),
    },
    displayRole: roleWithOrder.role,
    roleSortOrder: roleWithOrder.order,
    active: true,
    institution: "明治大学 総合数理学部 先端メディアサイエンス学科",
  };
};

export const newsModelMock = (faker: Faker): NewsModel => {
  return {
    slug: faker.lorem.slug(),
    title: faker.lorem.sentence(),
    dateStr: faker.date.recent().toISOString(),
    thumbnail: imageMock(faker),
    contentMd: faker.lorem.paragraphs(),
  };
};

export const paperModelMock = (faker: Faker): PaperModel => {
  return {
    slug: faker.lorem.slug(),
    title: faker.lorem.sentence(),
    abstract: faker.lorem.paragraph(),
    publishDateStr: faker.date.recent().toISOString(),
    language: faker.helpers.arrayElement(["english", "japanese"]),
    authors: faker.helpers.multiple(() => authorModelMock(faker), {
      count: { min: 1, max: 5 },
    }),
    journalTitle: faker.company.name(),
    type: faker.helpers.arrayElement(Object.values(paperTypeMap)),
    keywords: faker.helpers.multiple(() => faker.lorem.word(), {
      count: { min: 1, max: 5 },
    }),
    thumbnailImg: imageMock(faker),
    publication: {
      url: faker.internet.url(),

      volume: `${faker.number.int({ min: 1, max: 100 })}`,
      issue: `${faker.number.int({ min: 1, max: 100 })}`,
      pages: `${faker.number.int({ min: 1, max: 100 })} - ${faker.number.int({
        min: 1,
        max: 100,
      })}`,
      copyrightHolder: faker.company.name(),
      quotation: "quotation",
      customMetaList: [],
    },
    pdfUrl: faker.internet.url(),
    hero: {
      type: "image",
      image: {
        src: faker.image.urlPicsumPhotos({
          width: 1200,
          height: 630,
        }),
        width: 1200,
        height: 630,
      },
    },
  };
};

export const projectModelMock = (faker: Faker): ProjectModel => {
  return {
    slug: faker.lorem.slug(),
    title: faker.lorem.sentence(),
    category: faker.company.buzzNoun(),
    thumbnail: imageMock(faker),
    contentMd: faker.lorem.paragraphs(),
  };
};
