import { useParams } from "react-router-dom"
import { useEffect } from "react"
import { useDispatch } from "react-redux"
import * as playlistActions from "../../store/playlist"


function PlaylistDetail () {
    const {playlistId} = useParams();

    useEffect(() => {

    }, [playlistId])
}

export default PlaylistDetail