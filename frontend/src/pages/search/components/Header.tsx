import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { useState } from "react";
import { useQueryStore } from "@/stores/useQueryStore";

const Header = () => {
	 const [newQuery, setNewQuery] = useState("");
		const {sendQuery} = useQueryStore(); //useChatStore
	
		const handleSend = () => {
			if (!newQuery)
				return;
			sendQuery(newQuery.trim());
			// setNewQuery("");
			// setPlaceHolder(newQuery);
		}
	return (
		<div className='flex items-center gap-3 mb-5 '>
                <Input 
                    placeholder="Search for a song"
                    value={newQuery}
                    onChange={(e) => setNewQuery(e.target.value)}
                    className="bg-zinc-800 border-none"
                    onKeyDown={(e) => e.key=="Enter" && handleSend()}
                />

                <Button size={"icon"} onClick={handleSend} disabled={!newQuery.trim()}>
                    <Search className="size-4"/>
                </Button>
            </div>
	);
};
export default Header;
