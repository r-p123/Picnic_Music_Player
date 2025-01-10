import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { axiosInstance } from "@/lib/axios";
import { useAuth } from "@clerk/clerk-react";
import { Plus, Upload } from "lucide-react";
import { useRef, useState } from "react";
import toast from "react-hot-toast";
import { useMusicStore } from "@/stores/useMusicStore";

const AddSongDialog = (props: { songID: any; }) => {
	const [albumDialogOpen, setAlbumDialogOpen] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	// const fileInputRef = useRef<HTMLInputElement>(null);
    const { userId } = useAuth();
    
    const {playlists} = useMusicStore();

    if (!userId){
        console.log("User not found");
        return;
    }


	const [newAlbum, setNewAlbum] = useState({
		newtitle: "",
		userId: userId,
		newlist: [],
        existingPlaylist: "none",
	});


	const [imageFile, setImageFile] = useState<File | null>(null);

	const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (file) {
			setImageFile(file);
		}
	};

	const handleSubmit = async () => {
		setIsLoading(true);

		try {
			// if (!imageFile) {
			// 	return toast.error("Please upload an image");
			// }
            console.log("SongID: ", props.songID);

            if (newAlbum.newtitle && newAlbum.existingPlaylist!="none") {
				return toast.error("Please select either a current playlist OR only enter name for new playlist");
			}

            if (newAlbum.existingPlaylist != "none"){

                const formData = new FormData();
                formData.append("title", newAlbum.existingPlaylist);
                formData.append("userId", newAlbum.userId);
                formData.append("songId", props.songID);
                // formData.append("imageFile", imageFile);

                await axiosInstance.post("/playlist/addSong", formData, {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                });
                toast.success("Song added to playlist successfully");
                return;

            }else if (newAlbum.newtitle){

                const formData = new FormData();
                formData.append("title", newAlbum.newtitle);
                formData.append("userId", newAlbum.userId);
                
                // formData.append("imageFile", imageFile);
                await axiosInstance.post("/playlist/createPlaylist", formData, {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                });
                
                formData.append("songId", props.songID);
                await axiosInstance.post("/playlist/addSong", formData, {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                });
                toast.success("Song added to playlist successfully");
                return;

            }else{
                return;
            }

			setNewAlbum({
				newtitle: "",
                userId: "",
                newlist: [],
                existingPlaylist: "none",
			});

			// setImageFile(null);
			setAlbumDialogOpen(false);
			toast.success("Album created successfully");

		} catch (error: any) {
			toast.error("Failed to create album: " + error.message);
		} finally {
            window.location.reload();
            setAlbumDialogOpen(false);
			setIsLoading(false);
		}
	};

	return (
		<Dialog open={albumDialogOpen} onOpenChange={setAlbumDialogOpen}>
			<DialogTrigger asChild>
                <Button
                    variant={"ghost"}
                    size={"sm"}
                    className='text-green-400 hover:text-green-300 hover:bg-green-400/10'
                >					
                    <Plus className=' h-3 w-2' />
					Add Song
				</Button>
			</DialogTrigger>
			<DialogContent className='bg-zinc-900 border-zinc-700'>
				<DialogHeader>
					<DialogTitle>Add Song to Playlist</DialogTitle>
				</DialogHeader>
				<div className='space-y-4 py-4'>
					
                    <div className='space-y-2'>
						<label className='text-sm font-medium'>Select Playlist</label>
						<Select
							value={newAlbum.existingPlaylist}
							onValueChange={(event) => {
                                setNewAlbum({ ...newAlbum, existingPlaylist: event.toString() });
                            } 
                        }
						>
							<SelectTrigger className='bg-zinc-800 border-zinc-700'>
								<SelectValue placeholder='Select album' />
							</SelectTrigger>
							<SelectContent className='bg-zinc-800 border-zinc-700'>
								<SelectItem value='none'>None</SelectItem>
								{playlists.map((album) => (
									<SelectItem key={album.title} value={album.title}>
										{album.title}
									</SelectItem>
								))}
							</SelectContent>
						</Select>
					</div>

                    <div className="text-center pt-3">
                                Or
                            </div>

					<div className='space-y-2'>
						<label className='text-sm font-medium'>Create a new playlist</label>
						<Input
							value={newAlbum.newtitle}
							onChange={(e) => setNewAlbum({ ...newAlbum, newtitle: e.target.value })}
							className='bg-zinc-800 border-zinc-700'
							placeholder='Enter title'
						/>
					</div>
				</div>

				<DialogFooter>
					<Button variant='outline' onClick={() => setAlbumDialogOpen(false)} disabled={isLoading}>
						Cancel
					</Button>
					<Button
						onClick={handleSubmit}
						className='bg-violet-500 hover:bg-violet-600'
						disabled={isLoading || (!newAlbum.newtitle && newAlbum.existingPlaylist.trim().toLowerCase() === "none")}
					>
						{isLoading ? "Adding to playlist..." : "Add to playlist"}
                       
					</Button>
				</DialogFooter>
                    <div className="text-red-400">
                    {newAlbum.newtitle && newAlbum.existingPlaylist.trim().toLowerCase() != "none" ? 
                            "Select either current playlist or create new playlist" : 
                            ""}
                    </div>
			</DialogContent>
		</Dialog>
	);
};
export default AddSongDialog;
