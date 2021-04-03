import React from 'react'

export const avatarProfil = ({src,width,height,className}) => {
 
    return <img 
                src={src}
                width={width}
                height={height}
                alt="profil... mu"
                className={`circle `+className || ''}
                />
}


export default avatarProfil
