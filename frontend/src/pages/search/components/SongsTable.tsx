import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useQueryStore } from "@/stores/useQueryStore";
import { Calendar, Plus } from "lucide-react";
import AddSongDialog from "./AddSongDialog";

const SongsTable = () => {
    const {queryResponse, isLoading, error}  = useQueryStore();

    if(isLoading){
        return <div className="flex items-center justify-center py-8">
            <div className="text-zinc-400"> Loading songs ...</div>
        </div>
    }

    if (error){
        return (
            <div className="flex items-center justify-center py-8">
                <div className="text-red-400">{error}</div>
            </div>
        )
    }

    return (
        <Table>
            <TableHeader>
                <TableRow className="hover:bg-zinc-800/50">
                    <TableHead className='w-[50px]'></TableHead>
					<TableHead>Title</TableHead>
					<TableHead>Artist</TableHead>
					<TableHead>Release Date</TableHead>
					<TableHead className='text-right'>Actions</TableHead>
                </TableRow>
            </TableHeader>

            <TableBody>
                {queryResponse.map((song) => (
                    <TableRow key={song._id} className="hover:bg-zinc-800/50">
                        					<TableCell>
							<img src={song.imageUrl} alt={song.title} className='size-10 rounded object-cover' />
						</TableCell>
						<TableCell className='font-medium'>{song.title}</TableCell>
						<TableCell>{song.artist}</TableCell>
						<TableCell>
							<span className='inline-flex items-center gap-1 text-zinc-400'>
								<Calendar className='h-4 w-4' />
								{song.createdAt.split("T")[0]}
							</span>
						</TableCell>

						<TableCell className='text-right'>
							<div className='flex gap-2 justify-end'>
                                <AddSongDialog songID={song._id}/>
							</div>
						</TableCell>
                    </TableRow>
                ))
                }
            </TableBody>
        </Table>
    )
}

export default SongsTable