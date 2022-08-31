/* eslint-env browser */

// @ts-ignore
import CodeMirror from 'codemirror'
import * as Y from 'yjs'
import { WebsocketProvider } from 'y-websocket'
import { CodemirrorBinding } from 'y-codemirror'
import 'codemirror/mode/javascript/javascript.js'

window.addEventListener('load', () => {
  const ydoc = new Y.Doc()
  const provider = new WebsocketProvider(
    'wss://demos.yjs.dev',
    'codemirror-demo-2',
    ydoc
  )
  const ytext = ydoc.getText('codemirror')
  const editorContainer = document.getElementById('code')
  editorContainer.setAttribute('id', 'editor')
  //document.body.insertBefore(editorContainer, null)
  const editor = CodeMirror(editorContainer, {
    mode: 'javascript',
    lineNumbers: true
  })
  
  const binding = new CodemirrorBinding(ytext, editor, provider.awareness)

  document.getElementById('run').addEventListener('click', () => {
    document.getElementById('previewDiv').innerHTML = editor.getValue("\n")
    //alert('hi')
  })

  
  var nodemailer = require("nodemailer");
  /*
  let transporter = nodemailer.createTransport({
    sendmail: true,
    auth: {
      user: 'dayaniravi123@gmail.com',
      pass: 'Dayani@123'
    }
  });
  */
  document.getElementById('mail').addEventListener('click', () => {
    alert('hi')
    /*
    transporter.sendMail({
      from: 'dayaniravi123@gmail.com',
      to: 'ravip1152@gmail.com',
      subject: 'Message',
      text: 'I hope this message gets delivered!'
    }, (err, info) => {
      console.log(info.envelope);
      console.log(info.messageId);
    });
    alert('hi')
    */
  })
  

  const connectBtn = /** @type {HTMLElement} */ (document.getElementById('y-connect-btn'))
  connectBtn.addEventListener('click', () => {
    if (provider.shouldConnect) {
      provider.disconnect()
      connectBtn.textContent = 'Connect'
    } else {
      provider.connect()
      connectBtn.textContent = 'Disconnect'
    }
  })

  // @ts-ignore
  window.example = { provider, ydoc, ytext, binding, Y }
})
