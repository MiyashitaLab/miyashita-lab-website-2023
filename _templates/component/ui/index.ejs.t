---
to: src/components/ui/<%= h.changeCase.camel(name) %>/index.ts
---

export { <%= h.changeCase.pascal(name) %> } from "./<%= h.changeCase.pascal(name) %>";
export type { <%= h.changeCase.pascal(name) %>Props } from "./<%= h.changeCase.pascal(name) %>";
