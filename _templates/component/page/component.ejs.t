---
to: src/components/page/<%= h.changeCase.camel(name) %>/<%= h.changeCase.pascal(name) %>.tsx
---

import { FC } from "react";

export type <%= h.changeCase.pascal(name) %>Props = {
    //write your props here
};

export const <%= h.changeCase.pascal(name) %>: FC<<%= h.changeCase.pascal(name) %>Props> = ({  }) => {
  return (
    <></>
  );
};
