import React , {memo} from 'react'

import Follow from '../other/profil/follow'
import RedirectUser from '../other/profil/redirectUrl'

import '../../notif.css'
import { AvatarProfil } from '../../utils/auth/profil'
import Avatar from '../other/profil/avatarProfil'

const Notif = ({post,sender,text,type}) => {

    return (
            
        <div className="notif">
            <div className="notif-profile">
                <Avatar
                            className="avatar"
                            src={AvatarProfil(sender.profil)}
                            width={30}
                            height={30}
                           
                        />
                <div className="notif-txt"><RedirectUser nickname={sender.nickname}/> {text}</div>       
            </div>
            {type === 2 ? <Follow follow_id={sender.id} className="btn_edit"/>
                 : (
                        <img
                            className="follow"
                            alt="foto"
                            src={AvatarProfil(post.post)}
                            width={40}
                            height={40}
                            style={{cursor:'pointer'}}
                            onClick={() => window.location =`/p/${post.id}`}
                        />
            )}
        </div>
    )
}

export default memo(Notif);
