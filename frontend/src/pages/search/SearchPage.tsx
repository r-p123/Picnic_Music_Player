
import { ScrollArea } from "@/components/ui/scroll-area";
import Header from "./components/Header";
import SongsTabContent from "./components/SongsTabContent";
import Topbar from "@/components/Topbar";
// import { features } from "process";

const SearchPage = () => {

    return (
        <main className='rounded-md overflow-hidden h-full bg-gradient-to-b from-zinc-900  to-zinc-800'>
			<Topbar />
            <div className="p-4">
                <Header />

                {/* <DashboardStats /> */}

                <ScrollArea className="h-[calc(100vh-250px)]">
                    <SongsTabContent/>
                </ScrollArea>
            </div>
            

        </main>
    )
    
};
export default SearchPage;

