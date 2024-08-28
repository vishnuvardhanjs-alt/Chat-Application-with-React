import { useState, useEffect } from 'react'
import './App.css'
import 'react-chat-elements/dist/main.css'
import { MessageBox } from 'react-chat-elements'

function App() {
    const [text, setText] = useState("")
    const [msgs, setMsgs] = useState([])

    function handleSend(pos){
        setMsgs([...msgs, {position: pos, text : text}])
        setText("")
    }

    return (
        <div className="main-cont">
            <div className="msg-view">
                <div className="msg-cont">
                    <MessageBox
                        position={'left'}
                        type={'text'}
                        text={'Hello!'}
                    />
                    {
                        msgs.map((item, index)=>{
                            return(
                                <MessageBox 
                                    position={item.position}
                                    type={'text'}
                                    text = {item.text}
                                />
                            )
                        })
                    }

                </div>
                <div class="messageBox">
                    <input required="" onChange={(e)=>{setText(e.target.value)}} value={text} placeholder="Message..." type="text" id="messageInput" />
                    <button id="sendButton" onClick={()=>{handleSend("right")}}>
                    Send
                    </button>
                </div>

            </div>
        </div>
    )
}

export default App
