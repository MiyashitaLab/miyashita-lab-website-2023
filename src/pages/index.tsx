import { Top } from "@/components/page/top";

export default function Home() {
  const cardMock = {
    detailUrl: "/news/1",
    title: "ニュースタイトル",
    date: new Date(),
    thumbnail: {
      url: "/noimage.png",
      width: 384,
      height: 216,
    },
  };

  return (
    <Top
      news={{
        url: "/news",
        cards: [
          cardMock,
          cardMock,
          cardMock,
          cardMock,
          {
            detailUrl: "/news/1",
            title: "インタラクション2023に参加しました",
            date: new Date(),
            thumbnail: {
              url: "/noimage.png",
              width: 384,
              height: 216,
            },
          },
          cardMock,
          cardMock,
          cardMock,
        ],
      }}
      paper={{
        url: "/researches",
        cards: [
          cardMock,
          cardMock,
          cardMock,
          cardMock,
          cardMock,
          cardMock,
          cardMock,
          cardMock,
        ],
      }}
      project={{
        url: "/projects",
        cards: [],
      }}
      member={{
        url: "/members",
        cards: [],
      }}
    />
  );
}
