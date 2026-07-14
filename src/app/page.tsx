import { connectToDatabase } from "@/lib/mongodb";
import Item from "@/models/Item";
import { IItem } from "@/types/item";
import HomePageContent from "@/components/HomePageContent"; 

export default async function HomePage() {
  await connectToDatabase();
  
  
  const items = await Item.find().sort({ createdAt: -1 }).limit(4).lean();
  
  const latestItems = items.map((item) => ({
    ...item,
    _id: item._id.toString(), 
    createdAt: item.createdAt?.toISOString(), 
  })) as unknown as IItem[]; 

  return <HomePageContent latestItems={latestItems} />;
}