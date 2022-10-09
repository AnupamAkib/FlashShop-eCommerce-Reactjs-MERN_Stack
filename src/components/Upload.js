import React, { useState } from 'react'
import axios from 'axios';

export default function Upload() {
    const [state, setState] = useState({
        selectedFile: "",
        responseArray: [],
    })
    const [uploadInfo, setUploadInfo] = useState({});
    const [Loading, setLoading] = useState(false)
    const handleInputChange = (event) => {
        console.log(event.target.files)
        setState({
          selectedFile: event.target.files,
          responseArray:[]
        });
    }

    const onSubmit = () => {
        if (!state.selectedFile) {
          alert("Please select a file!");
          return false;
        }
        const data = new FormData();
    
        for (let i = 0; i < state.selectedFile.length; i++) {
          data.append("file[]", state.selectedFile[i]);
        }
    
        let url = "https://diulibrary.000webhostapp.com/file.php";
    
        axios
          .post(url, data, {
            // receive two parameter endpoint url ,form data
          })
          .then((res) => {
            // then print response status
            setState({ responseArray: res.data });
            console.log(res.data[0])
            setUploadInfo(res.data[0]);
            resetFile();
          },error=>{
            alert(error);
          });
      }
    
    const resetFile = () => {
      // Reset file input control
      document.getElementsByName("file")[0].value = null;
    }

    return (
        <div className='container'>
            <br/><br/>
            <input
                type="file"
                className="form-control"
                name="fileToUpload"
                onChange={handleInputChange}
            />
            <button
                type="submit"
                className="btn btn-success"
                onClick={() => onSubmit()}
            >
                Upload File
            </button>
            {
            uploadInfo.status=="success"? 
            <div>
                <br/>
                <b>Status: </b><font color='green'>{uploadInfo.status}</font> 
                <br/><b>URL: </b> <a href={uploadInfo.url} target='_blank'>{uploadInfo.url}</a>
                <br/><b>Preview: </b><br/>
                <iframe src={uploadInfo.url} width='100%' height = '450px'/>
            </div>
        : ""}
        </div>
    )
}
