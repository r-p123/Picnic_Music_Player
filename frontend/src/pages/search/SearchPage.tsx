
import { ScrollArea } from "@/components/ui/scroll-area";
import Header from "./components/Header";
import SongsTabContent from "./components/SongsTabContent";
// import { features } from "process";

const SearchPage = () => {

    return (
        <div
            className='min-h-screen bg-gradient-to-b from-zinc-900 via-zinc-900
                        to-black text-zinc-100 p-8'
        >
            <Header />

            {/* <DashboardStats /> */}
            
            <ScrollArea className="h-[calc(100vh-300px)]">
                <SongsTabContent/>
            </ScrollArea>

        </div>
    )
    
};
export default SearchPage;

