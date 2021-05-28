import { useState, useRef } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Typography, Button, CircularProgress, Box } from '@material-ui/core';
import { v4 as uuidv4 } from 'uuid';
import { storage, atoms, useI18n } from 'misc'
import { SetterOrUpdater, useRecoilValue } from 'recoil'
import { useInsertFileMutation, useDeleteFilesMutation } from 'generated'
import addImage from 'assets/images/addImage.png'
import CSS from 'csstype'
import { ImageProps } from '../types';

const useStyles = makeStyles((theme) => ({
  img: {
    height: '200px',
    maxWidth: 400,
    display: 'block',
    width: '100%',
    margin: "auto",
    objectFit: 'cover',
    marginTop: '1rem'
  },
  imageButton: {
    position: "absolute",
    top: "1rem",
    left: "1rem"
  },
  input: {
    display: 'none',
  }
}));

function CircularProgressWithLabel(props:{ value:number, style:CSS.Properties, [props:string]:any }) {

  return (
  <Box         
    top={"100px"}
    left={"50%"}
    style={{transform: "translate(-50%, -50%)"}}
    position="absolute"
    alignItems="center"
    justifyContent="center" 
  >
      <CircularProgress variant="indeterminate" {...props} />
      <Box
        top={0}
        left={0}
        bottom={0}
        right={0}
        position="absolute"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <Typography variant="caption" style={{visibility: props.style.visibility}} component="div" color="textSecondary">{`${Math.round(
          props.value,
        )}%`}</Typography>
      </Box>
    </Box>
  );
}

function CircularProgressWithoutLabel(props:{ style?:CSS.Properties, [props:string]:any }) {

  return (
   <Box         
      top={"100px"}
      left={"50%"}
      style={{transform: "translate(-50%, -50%)"}}
      position="absolute"
      alignItems="center"
      justifyContent="center" 
    >
      <CircularProgress {...props} />
      <Box
        top={0}
        left={0}
        bottom={0}
        right={0}
        position="absolute"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
      </Box>
    </Box>
  );
}

type ImageInputProps = { input: ImageProps, setFormData: SetterOrUpdater<{[prop:string]: any }>, initiativeID?: string }

export default function ImageInput({ input, setFormData, initiativeID }: ImageInputProps) {
  const classes = useStyles()
  const i18n = useI18n()

  const fileInput = useRef<HTMLInputElement>(null)
  const user = useRecoilValue(atoms.user)
  const [ fileData, setFileData ] = useState<File | null>()
  const [ uploadState, setUploadState ] = useState("")
  const [ uploadCompleted, setUploadCompleted ] = useState(0)
  const [ URL, setURL ] = useState<string>()
  const [ insertFile ] = useInsertFileMutation()
  const [ deleteFiles ] = useDeleteFilesMutation()

  const handleSubmit = async () => {
    if ( !fileData || !fileInput.current || !initiativeID ) { return; }
    const uuid = uuidv4()
    const extension = fileData.name.split(".").pop()
    const file_path = `/public/initiatives/${initiativeID}/${uuid}.${extension}`
    await storage.put(file_path, fileData, null, (d: any) => {
      setUploadCompleted((d.loaded / d.total) * 100)
    })
    setUploadState("")
    fileInput.current.value = ""
    const downloadable_url = `https://api.weee.city/storage/o${file_path}`
    setURL(downloadable_url)
    await insertFile({
      variables: {
        file: {
          file_path,
          downloadable_url,
          user_id: user?.id,
          initiative_id: initiativeID
        },
      },
    })
    setFormData(formData=>({...formData, [input.id]: downloadable_url }))
  };
  
  const ResetInput = ()=>{
    console.log('reset form')
    setUploadState("")
    setUploadCompleted(0)
    setURL(undefined)
  }

  const DeleteImage = ()=>{
    console.log('delete image')
    if( URL ) {
      storage.delete( `/public/initiatives/` + URL.split('/public/initiatives/').reverse()?.[0] )
      deleteFiles({variables:{where:{downloadable_url:{_eq:URL}}}})
    }
  }
  
  return (
  <form
    onSubmit={(e) => {
      e.preventDefault();
      handleSubmit();
    }}
  >
    <div className={classes.img} key={input.id}>
      {uploadCompleted && <CircularProgressWithLabel value={uploadCompleted} style={{color: "#ffffff", visibility: uploadCompleted?"visible":"hidden"}}/> }
        <section 
          style={{
            backgroundImage: `url(${URL? URL+'?w=600&q=90': (input.imgPath||addImage)})`,
            backgroundPosition: 'center',
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat'
          }}
          className={classes.img} 
          key={input.id}
        />
        <input
          accept="image/*"
          className={classes.input}
          type="file"
          onChange={(e) => {
            if (!e.target.files?.length) return;
            ResetInput()
            setFileData(e.target.files[0]);
          }}
          ref={fileInput}
        />
        <label htmlFor="contained-button-file">
          <Button className={classes.imageButton} variant={ URL? "contained": "outlined" } component="span" size="small" disableElevation>
            { URL? i18n('initiativeChangePicture'): input.label }
          </Button>
        </label>
    </div>
  </form>
  );
}