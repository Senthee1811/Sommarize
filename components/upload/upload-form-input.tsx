
import { Button } from "@/components/ui/button";
import { Input } from "../ui/input";

interface UploadFormInputProps{
    onSubmit: (e:React.FormEvent<HTMLFormElement>) => void;
}
export default function UploadFormInput({onSubmit}:UploadFormInputProps){
    return (
        <div>
            <form className="flex flex-col gap-6" onSubmit={onSubmit}>
                <div className="flex justify-end items-center gap-1.5">
                    <Input type="file" name="file" id="file" accept="aplication/pdf"
                required className="" /> 
                <Button>Upload Your PDF</Button>
                </div>

            </form>
        </div>
    )
}