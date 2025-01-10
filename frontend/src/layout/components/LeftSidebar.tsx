import PlaylistSkeleton from "@/components/skeletons/PlaylistSkeleton";
import { Button, buttonVariants } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { useMusicStore } from "@/stores/useMusicStore";
import { SignedIn } from "@clerk/clerk-react";
import { HomeIcon, Library, Search, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "@clerk/clerk-react";
import { axiosInstance } from "@/lib/axios";
import toast from "react-hot-toast";
// import { confirm } from "react-confirm";


const LeftSidebar = () => {
    // data fetching => zustand
    const {playlists, getAllPlaylistsForUser, isLoading} = useMusicStore();
    const { userId } = useAuth();
    const [isVisible, setIsVisible] = useState(false);
    const [selectedPlaylist, setSelectedPlaylist] = useState("");

    if (!userId){
        console.log("user undefined");
        return;
    }
    useEffect(() => {
        getAllPlaylistsForUser(userId)
    }, [])

    const handleEvent = async (playlistTitle : string, userId: string) => {
        try{
            await axiosInstance.delete("/playlist/deletePlaylist",{
                data: {
                "title": playlistTitle,
                "userId": userId
                }
            });
            toast.success("Playlist: " + playlistTitle + " successfully");

            // console.log("deleting", playlistTitle);
        }catch(e){
            console.log(e);
        }finally{        
            window.location.reload();
        }
        return;
    }
    
    // console.log({playlists});
    if (!playlists){
        console.log("No playlists fetched.")
    }
    
    return (
    <div className="h-full flex flex-col gap-2">
        {/* Navigation menu */}

        <div className="rounded-lg bg-zinc-900 p-4"> 
            <div className="space-y-2">
                <Link   to={"/"} 
                        className={cn(buttonVariants(
                            {
                                variant:"ghost",
                                className: "w-full justify-start text-white hover:bg-zinc-800"
                            }
                        ))}
                >
                    <HomeIcon className="mr-2 size-5"/>
                    <span className="hidden md:inline">Home</span>
                </Link>

                {/* if signed in, show option for searching for songs */}
                <SignedIn>
                    <Link   to={"/search"} 
                            className={cn(buttonVariants(
                                {
                                    variant:"ghost",
                                    className: "w-full justify-start text-white hover:bg-zinc-800"
                                }
                            ))}
                    >
                        <Search className="mr-2 size-5"/>
                        <span className="hidden md:inline">Search</span>
                    </Link>
                </SignedIn>
            </div>
        </div>

        {/* Library Section */}
        <div className="flex-1 rounded-lg bg-zinc-900 p-4">
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center text-white px-2">
                    <Library className="size-5 mr-2"/>
                    <span className="hidden md:inline"> Playlists </span>
                </div>
            </div>

            <ScrollArea className="h-[calc(100vh-300px)]">
            


{
<div className="space-y-2">{isLoading ? <PlaylistSkeleton /> : (
   
    playlists.map((pList) => (
        <Link to={`/playlist/${userId}/${pList.title}`}
                            key={pList.title}
                            className="p-2 hover:bg-zing-800 rounded-md flex items-center gap-3 group cursor-pointer"
                        >
        <div
            key={pList._id}
            className={`grid grid-cols-[1fr_1fr_1fr] gap-2 px-2 py-2 text-sm 
                text-zinc-400 hover:bg-white/5 rounded-md group cursor-pointer`}
                onMouseEnter={() => {setIsVisible(true); setSelectedPlaylist(pList.title)}}
                onMouseLeave={() => {setIsVisible(false); setSelectedPlaylist("")}}
        >
            


              
            <div className="flex items-center rounded-md">
                <img src={pList.imageUrl} alt={pList.title} className="size-12 rounded-md" />
            </div>

            <div className="flex items-center align-middle text-base">{pList.title}</div>
            
            <div className="flex items-center align-middle px-5">
                <Button size='icon'
                variant='ghost'
                className='hover:text-red-500 '
                onClick={() => handleEvent(pList.title, userId)}
                >
                        {selectedPlaylist===pList.title && isVisible && <Trash2></Trash2>} 
                </Button>
            </div>
        </div>
        </Link>
    )
    )
)}

</div> }
         
            </ScrollArea>
        </div>
    </div>
  )
}

export default LeftSidebar;