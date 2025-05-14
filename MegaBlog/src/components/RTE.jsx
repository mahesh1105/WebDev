// RTE - Real Time Editor
import React from "react";
import { Editor } from '@tinymce/tinymce-react'
import {Controller} from 'react-hook-form'

const RTE = ({name, control, label, defaultValue=''}) => {
  return (
    <div className="w-full">
      {label && 
        <label className="inline-block mb-1 pl-1">
          {label}
        </label>
      }

      <Controller 
        name={name || "content"}
        control={control}
        render={({field: {onChange}}) => (
          <Editor 
            apiKey='lku8w6ibdtcuiwo3t8r6ffzp6f7yixbpfzyk5u0acjuxh5k7'
            initialValue={defaultValue}
            init={{
              height: 500,
              menubar: false,
              plugins: [
                'image',
                'advlist',
                'autolink',
                'lists',
                'link', 
                'charmap', 
                'preview', 
                'anchor',
                // 'print',
                'searchreplace', 
                'visualblocks',
                'code',
                'fullscreen',
                'insertdatetime',
                'media',
                'table', 
                // 'paste', 
                'help', 
                'wordcount'
              ],
              toolbar: 
                'undo redo | blocks | image | formatselect | bold italic underline forecolor | \
                 alignleft aligncenter alignright alignjustify | \
                 bullist numlist outdent indent | removeformat | help',
              /** 👇 Add this line to force cloud-based plugin loading */
              external_plugins: {},
              content_style: 'body { font-family: Helvetica, Arial, sans-serif; font-size:14px }'
            }}
            onEditorChange={onChange}
          />
        )}
      />
    </div>
  )
}

export default RTE;

/*
  control param is basically used to give the reference of this editor to the parent
  (where ever we will use it)
  Controller will basically pass the control from one place to other
  It comes from react hook form and helps us in taking the control of all the events, changes to give 
  to the parent (parent needs to pass this control param from there) then only will get the reference
*/