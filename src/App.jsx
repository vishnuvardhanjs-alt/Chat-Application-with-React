import { useState, useEffect, useReducer } from 'react'
import './App.css'
import 'react-chat-elements/dist/main.css'
import { MessageBox } from 'react-chat-elements'
import Sentiment from 'sentiment'

function App() {
    let sentiment = new Sentiment();
    const [text, setText] = useState("")
    const [msgs, setMsgs] = useState([])
    const [senti, sentiFunc] = useReducer(updateSenti, { count: 0, score:0 });
    const [emoji, setEmoji] = useState("")
    const [score, setScore] = useState(0)

    const qLst = ['How was your day today?', 'Are you Happy?', 'Did you greet higher authorities?',
        'Did you have an good conversation today?', 'Were people nice to you today?', 'How was your meal today?',
        'Did you sleep well?', 'How do you look today?', 'How was the movie which you saw recently?', 'Are you relaxed now?'
    ]
    useEffect(() => {
        let temp_score = (senti.score / senti.count).toFixed(2)
        setScore(temp_score)
        if (temp_score == 69) {
            setEmoji("🥵")
        } else if (temp_score > 0) {
            setEmoji("😄")
        } else if (temp_score < 0) {
            setEmoji("☹️")
        } else {
            setEmoji("😐")
        }
        setTimeout(() => {
            if (msgs.length > 0) {
                let rQ = qLst[Math.floor(Math.random() * qLst.length)]
                setMsgs([...msgs, { position: "left", text: rQ }])
            }
        }, 500);


    }, [senti]);

    function updateSenti(state, value) {

        return {
            score: state.score + value,
            count: state.count + 1
        };

    }

    function handleSend() {
        setMsgs([...msgs, { position: "right", text: text }])
        let compScore = sentiment.analyze(text).comparative
        sentiFunc(compScore)
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
                        msgs.map((item, index) => {
                            return (
                                <MessageBox
                                    position={item.position}
                                    type={'text'}
                                    text={item.text}
                                />
                            )
                        })
                    }

                </div>
                <div className="messageBox">
                    <input required="" onChange={(e) => { setText(e.target.value) }} value={text} placeholder="Message..." type="text" id="messageInput" />
                    <button id="sendButton" type='submit'
                        onClick={() => { handleSend() }}>
                        Send
                    </button>
                </div>
            </div>
            <div className="right-cont">
                {!isNaN(score) ? (
                    <div className='score-cont'>
                        <p>Sentiment Score : {score}</p>
                        <p className='emoji'>{emoji}</p>
                    </div>
                ) : (
                    <div className='score-cont'>
                        <p>Sentiment Score : 0</p>
                        <p className='emoji'>😐</p>
                    </div>
                )}
            </div>
        </div >
    )
}

export default App
