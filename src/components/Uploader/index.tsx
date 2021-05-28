import { useState, useRef } from 'react'
import { Button } from '@material-ui/core'
import { storage, atoms } from 'misc'
import { v4 as uuidv4 } from 'uuid'
import { useRecoilValue } from 'recoil'
import { useInsertFileMutation } from 'generated'

export interface IFilesProps {}

export default function Files(props: IFilesProps) {

  const fileInput = useRef<HTMLInputElement>(null)
  const user = useRecoilValue(atoms.user)
  const [ initiativeID, setInitiativeID ] = useState<string>()
  const [ fileData, setFileData ] = useState<File | null>()
  const [ uploadState, setUploadState ] = useState("")
  const [ uploadCompleted, setUploadCompleted ] = useState(0)
  const [ insertFile ] = useInsertFileMutation()

  const handleSubmit = async () => {
    if ( !fileData || !fileInput.current || !initiativeID ) { return; }
    const uuid = uuidv4();
    const extension = fileData.name.split(".").pop();
    const file_path = `/public/initiatives/${initiativeID}/${uuid}.${extension}`;
    await storage.put(file_path, fileData, null, (d: any) => {
      setUploadCompleted((d.loaded / d.total) * 100);
    });
    setUploadState("");
    fileInput.current.value = "";
    const downloadable_url = `https://api.weee.city/storage/o${file_path}`;
    await insertFile({
      variables: {
        file: {
          file_path,
          downloadable_url,
          user_id: user?.id,
          initiative_id: initiativeID
        },
      },
    });
  };

  return (
    <div style={{zIndex:10, width: '50%', height:'50%', position:'absolute', left:'calc(50%)', top:'calc(50%)'}}>
      <div className="max-w-xl mx-auto">
        <div className="py-6">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit();
            }}
          >
            <div className="input-file-header">
              <input
                type="file"
                onChange={(e) => {
                  if (!e.target.files?.length) return;
                  setFileData(e.target.files[0]);
                }}
                ref={fileInput}
              />
              <Button
                color="primary"
                variant="contained"
                disabled={uploadState === "UPLOADING"}
                type="submit"
              >
                Upload
              </Button>
            </div>
          </form>
        </div>

        {uploadState === "UPLOADING" && (
          <div className="uploading-progress">
            {uploadCompleted} %
            {/* <LinearProgress variant="determinate" value={uploadCompleted} /> */}
          </div>
        )}
      </div>
    </div>
  );
}