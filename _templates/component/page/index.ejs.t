---
to: src/components/page/<%= h.changeCase.camel(name) %>/index.ts
---

export { <%= h.changeCase.pascal(name) %> } from "./<%= h.changeCase.pascal(name) %>";
export type { <%= h.changeCase.pascal(name) %>Props } from "./<%= h.changeCase.pascal(name) %>";
