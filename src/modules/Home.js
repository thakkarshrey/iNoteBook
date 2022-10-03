import React, { useRef } from 'react'
import AddNote from './AddNote'

import Notes from './Notes'

function Home(props) {
    const {showAlert} = props
    return (
        <>
            <Notes showAlert={showAlert}/>
        </>
    )
}

export default Home