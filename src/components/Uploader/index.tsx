import React, { useState, useRef } from 'react'
import { FormControl, TextField, Button } from '@material-ui/core'
import { register, login, storage, INSERT_FILE, BACKEND_ENDPOINT } from 'misc'
import { useMutation } from '@apollo/client'
import { v4 as uuidv4 } from 'uuid'

export interface IFilesProps {}

export default function Files(props: IFilesProps) {
  const fileInput = useRef<HTMLInputElement>(null);
  const [fileData, setFileData] = useState<File | null>();
  const [uploadState, setUploadState] = useState("");
  const [uploadCompleted, setUploadCompleted] = useState(0);

  console.log("inside files component");

  const [
    insertFile,
    // { loading: mutationLoading, error: mutationError },
  ] = useMutation(INSERT_FILE);

  const handleSubmit = async () => {
    if (!fileData || !fileInput.current) {
      // console.log("No file selected");
      return;
    }

    const uuid = uuidv4();
    const extension = fileData.name.split(".").pop();
    const file_path = `/public/${uuid}.${extension}`;

    await storage.put(file_path, fileData, null, (d: any) => {
      setUploadCompleted((d.loaded / d.total) * 100);
    });

    setUploadState("");
    fileInput.current.value = "";

    const downloadable_url = `${BACKEND_ENDPOINT}/storage/o${file_path}`;
    await insertFile({
      variables: {
        file: {
          file_path,
          downloadable_url,
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
        <div className="py-6">
          <Button
            disabled={uploadState === "UPLOADING"}
            onClick={async () => {
              const metadata = await storage.getMetadata("/public/");
              console.log({ metadata });
              alert("check logs for metadta ");
            }}
          >
            Get /public/ metadata
          </Button>
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