import React from 'react';
import {useDropzone} from 'react-dropzone';

function PlaylistImageDrop() {
  const {
    acceptedFiles,
    fileRejections,
    getRootProps,
    getInputProps
  } = useDropzone({
    accept: {
      'image/jpeg': [],
      'image/png': []
    },
    maxFiles: 1
  });

  const acceptedFileItems = acceptedFiles.map(file => (
    <li key={file.path}>
      {file.path} - {file.size} bytes
    </li>
  ));

  const fileRejectionItems = fileRejections.map(({ file, errors }) => (
    <li key={file.path}>
      {file.path} - {file.size} bytes
      <ul>
        {errors.map(e => (
          <li key={e.code}>{e.message}</li>
        ))}
      </ul>
    </li>
  ));

  return (
    <section className="container">
      <div {...getRootProps({ className: 'dropzone' })}>
        <input {...getInputProps()} />
        <p>Drag 'n' drop an image file here, or click to select files</p>
        <em>(Only *.jpeg and *.png images will be accepted)</em>
      </div>
      {acceptedFiles.length ? <p className='file-upload-feedback'>{`File ${acceptedFileItems[0].key} has been successfully added`}</p>: null }
      {fileRejections.length ? <p className='file-upload-feedback'>{`File ${fileRejectionItems[0].key} has been rejected`}</p>: null }
      {/* <aside>
        <h4>Accepted files:</h4>
        <ul>{acceptedFileItems}</ul>
        <h4>Rejected files:</h4>
        <ul>{fileRejectionItems}</ul>
      </aside> */}
    </section>
  );
}


export default PlaylistImageDrop