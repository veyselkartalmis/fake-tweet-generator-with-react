import React, { useState } from "react";
import "./style.scss";
import { ReplyIcon, RetweetIcon, LikeIcon, ShareIcon, VerifiedIcon } from "./icons";


// Tweeti ozel karakterlerden ayirarak ayri renklendirme yapabilmemizi saglayan fonksiyon (regEx)
const tweetFormat = tweet => {
    tweet = tweet
        .replace(/@([\w]+)/g, '<span>@$1</span>')
        .replace(/#([\wşçöğüıİ]+)/gi, '<span>#$1</span>')
        .replace(/(https?:\/\/[\w\.\/]+)/, '<span>$1</span>')
        .replace(/\n/g, '<br />');
    return tweet;
}

export default function App() {
    const [name, setName] = useState();
    const [userName, setUserName] = useState();
    const [isVerified, setIsVerified] = useState(false);
    const [tweet, setTweet] = useState();
    const [avatar, setAvatar] = useState();
    const [retweets, setRetweets] = useState(0);
    const [quoteTweets, setQuoteTweets] = useState(0);
    const [likes, setLikes] = useState(0);

    return (
        <>
            <div className="tweet-settings">
                <h3>Tweet Ayarları</h3>
                <ul>
                    <li>
                        <label>Ad Soyad</label>
                        <input
                            type="text"
                            className="input"
                            value={name}
                            onChange={e => setName(e.target.value)}
                        />
                    </li>
                    <li>
                        <label>Kullanıcı Adı</label>
                        <input
                            type="text"
                            className="input"
                            value={userName}
                            onChange={e => setUserName(e.target.value)}
                        />
                    </li>
                    <li>
                        <label>Tweet Metni</label>
                        <textarea
                            value={tweet}
                            onChange={e => setTweet(e.target.value)}
                            maxLength="290"
                        />
                    </li>
                    <li>
                        <label>Retweet Sayısı</label>
                        <input
                            type="number"
                            className="input"
                            value={retweets}
                            onChange={e => setRetweets(e.target.value)}
                        />
                    </li>
                    <li>
                        <label>Alıntı Tweet Sayısı</label>
                        <input
                            type="number"
                            className="input"
                            value={quoteTweets}
                            onChange={e => setQuoteTweets(e.target.value)}
                        />
                    </li>
                    <li>
                        <label>Beğeni Sayısı</label>
                        <input
                            type="number"
                            className="input"
                            placeholder="Beğeni Sayısı"
                            value={likes}
                            onChange={e => setLikes(e.target.value)}
                        />
                    </li>
                </ul>
            </div>
            <div className="tweet-container">
                <div className="tweet">
                    <div className="tweet-author">
                        <img src="https://avatars.githubusercontent.com/u/19537228?v=4" alt="user" />
                        <div>
                            <div className="name">
                                {name || "Ad Soyad"}
                                {isVerified && <VerifiedIcon width="19" height="19" />}
                            </div>
                            <div className="username">@{userName || "username"}</div>
                        </div>
                    </div>
                    <div className="tweet-content">
                        <p dangerouslySetInnerHTML={{
                            __html:
                                (tweet && tweetFormat(tweet)) ||
                                "Bu alana örnek tweet gelecektir."
                        }}
                        />
                    </div>
                    <div className="tweet-stats">
                        <span><b>{retweets}</b> Retweet</span>
                        <span><b>{quoteTweets}</b> Alıntı Tweetler</span>
                        <span><b>{likes}</b> Beğeni</span>
                    </div>
                    <div className="tweet-actions">
                        <span><ReplyIcon /></span>
                        <span><RetweetIcon /></span>
                        <span><LikeIcon /></span>
                        <span><ShareIcon /></span>
                    </div>
                </div>
            </div>
        </>
    )
}