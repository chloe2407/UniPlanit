import React, { useState } from 'react'

export function useImg() {
    const [imgUrl, setImgUrl] = useState()
    
    const loadImg = () => {
        fetch('photo', { method: 'GET' })
            .then(res => res.json())
            .then(data => setImgUrl(data))
            .catch(err => console.error(err))
    }
    
    return [imgUrl, loadImg]
}