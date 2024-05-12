import*as react from 'react'
import './App'

function App() {
  const [length, setLength] = react.useState(8);
  const [password, setPassword] = react.useState("");
  const [character, setCharacter] = react.useState(false);
  const [number, setNumber] = react.useState(false);

  const passwordref = react.useRef(null)

  const passwordGenerator = react.useCallback(()=>{
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    if(number) str +='0123456789'
    if(character) str +='~`!@#$%^&*()_+{}":?><-=[];/.,'

    for(let i = 1; i <= length; i++){
      let char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char)
    }
    setPassword(pass)


  },[length,character,number,setPassword])

  const passwordCopy = react.useCallback(()=>{
    passwordref.current?.select();
    //passwordref.current?.setSelectionRange(0, 20)
    window.navigator.clipboard.writeText(password)
  },[password])

  react.useEffect(()=>{
    passwordGenerator()
  },[length,character,number,passwordGenerator])

  return (
    
      <>
        <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-2 my-8 text-orange-500 bg-gray-800'>
          <h1 className='text-center py-2'>Password Generator</h1>
        <div className='flex shadow-rounded-lg overflow-hidden mb-4'>
          <input 
          type="text"
          value={password}
          className='outline-none w-full py-1 px-3 rounded-2xl'
          placeholder='Password'
          readOnly
          ref={passwordref}
          />
          <button
          className='outline-none bg-blue-700 text-white rounded-lg px-2 mx-2'
          onClick={passwordCopy}
          >Copy</button>
        </div>
        <div className='flex text-sm gap-x-2'>
          <div className='flex items-center gap-x-1'>
            <input type="range"
            min={8}
            max={16}
            value={length}
            className='cursor-pointer'
            onChange={(e) => {setLength(e.target.value)}}
            />
            <label htmlFor="">length : {length}</label>
          </div>
          <div className='flex items-center gap-x-1'>
          <input 
          type="checkbox"
          defaultChecked={number}
          onChange={ () => {
            setNumber((prev)=> !prev
            )
          }}
          />
          <label htmlFor="">Number</label>
          </div>
          <div className='flex items-center gap-x-1'>
          <input 
          type="checkbox"
          defaultChecked = {character}
          onChange={()=>{
            setCharacter((prev)=> !prev
          )
          }}  
          />
          <label htmlFor="">Character</label>
          </div>
        </div>
        </div>
      </>
    
  )
}

export default App
