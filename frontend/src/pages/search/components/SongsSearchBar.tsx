import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send } from "lucide-react";
import { useState } from "react";
import { useQueryStore } from "@/stores/useQueryStore";

const SongsSearchBar = () => {

    const [newQuery, setNewQuery] = useState("");
    const {sendQuery} = useQueryStore(); //useChatStore
    const [placeHolder, setPlaceHolder] = useState("Search for a song");

    const handleSend = () => {
        if (!newQuery)
            return;
        sendQuery(newQuery.trim());
        // setNewQuery("");
        // setPlaceHolder(newQuery);
    }

    return (
        
        <div className="p-4 mt-auto border-t border-zinc-800">
            
            <div className='flex items-center gap-3 mb-2'>
                
          
                <Input 
                    placeholder={placeHolder}
                    value={newQuery}
                    onChange={(e) => setNewQuery(e.target.value)}
                    className="bg-zinc-800 border-none"
                    onKeyDown={(e) => e.key=="Enter" && handleSend()}
                />

                <Button size={"icon"} onClick={handleSend} disabled={!newQuery.trim()}>
                    <Send className="size-4"/>
                </Button>
            </div>
        </div>
    )
}

export default SongsSearchBar