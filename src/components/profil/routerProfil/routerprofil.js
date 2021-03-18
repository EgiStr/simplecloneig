import React from 'react'

import {Switch,Route} from 'react-router-dom'

import Posts from './posts'
import SavePosts from './save_post'

const routerprofil = ({idUser,path}) => {
    return (
        <div>
            <Switch>
                    <Route path={`${path}`} exact component={()=> <Posts param={idUser} />} />
                    <Route path={`${path}/savePost`} exact component={() => <SavePosts param={idUser} />} />
            </Switch>
        </div>
    )
}


export default routerprofil
