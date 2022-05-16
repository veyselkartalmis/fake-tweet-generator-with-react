import React from "react";
import "./style.scss";
import { ReplyIcon, RetweetIcon, LikeIcon, ShareIcon, VerifiedIcon } from "./icons";

export default function App() {
    return (
        <div className="tweet">
            <div className="tweet-author">
                <img src="https://avatars.githubusercontent.com/u/19537228?v=4" />
                <div>
                    <div className="name">Veysel Kartalmis</div>
                    <div className="username">@veyselkartalmis</div>
                </div>
            </div>
            <div className="tweet-content">
                <p>Bu tweet fake tweet generator uygulaması için atılmıştır</p>
            </div>
            <div className="tweet-stats">
                <span><b>24</b> Retweet</span>
                <span><b>24</b> Alıntı Tweetler</span>
                <span><b>24</b> Beğeni</span>
            </div>
            <div className="tweet-actions">
                <span><ReplyIcon /></span>
                <span><RetweetIcon /></span>
                <span><LikeIcon /></span>
                <span><ShareIcon /></span>
            </div>
        </div>
    )
}