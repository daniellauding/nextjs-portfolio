import { getPortfolioData } from "@/lib/data";
import HomeContent from "./HomeContent";

// Always render dynamically (reads from DB at request time)
export const dynamic = "force-dynamic";

export default async function Home() {
  const data = await getPortfolioData();
  return <HomeContent data={data as Parameters<typeof HomeContent>[0]["data"]} />;
}
