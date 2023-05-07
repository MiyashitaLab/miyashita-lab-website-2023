import { Top } from "@/components/page/top";
import { Primary } from "@/components/page/top/Top.stories";

export default function Home() {
  //TODO CMSから取得する
  return <Top {...Primary.args} />;
}
