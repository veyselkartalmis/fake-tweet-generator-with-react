import React, { useState, createRef, useEffect } from "react";
import "./style.scss";
import { ReplyIcon, RetweetIcon, LikeIcon, ShareIcon, VerifiedIcon } from "./icons";
import { AvatarLoader } from "./Loader";
import { useScreenshot } from "use-react-screenshot";

// Tweeti ozel karakterlerden ayirarak link renklendirmesi yapabilmemizi saglayan fonksiyon (regEx)
const tweetFormat = tweet => {
    tweet = tweet
        .replace(/@([\w]+)/g, '<span>@$1</span>')
        .replace(/#([\wşçöğüıİ]+)/gi, '<span>#$1</span>')
        .replace(/(https?:\/\/[\w\.\/]+)/, '<span>$1</span>')
        .replace(/\n/g, '<br />');
    return tweet;
}

// Eger istatistikler 1000'den buyuk ise sayıyı parcalamaya yarayan fonksiyon
const formatNumber = number => {
    if(!number){number = 0}
    if(number < 1000) {return number}
    number /= 1000;
    number = String(number).split(".");
    return (
        number[0] + (number[1] > 100 ? "," + number[1].slice(0, 1) + " B" : " B")
    )
}

export default function App() {
    const tweetRef = createRef();
    const downloadRef = createRef();
    const [name, setName] = useState();
    const [userName, setUserName] = useState();
    const [isVerified, setIsVerified] = useState(false);
    const [tweet, setTweet] = useState();
    const [avatar, setAvatar] = useState();
    const [retweets, setRetweets] = useState(0);
    const [quoteTweets, setQuoteTweets] = useState(0);
    const [likes, setLikes] = useState(0);
    const [image, takeScreenshot] = useScreenshot();
    const getImage = () => takeScreenshot(tweetRef.current);

    useEffect(() => {
        if(image){downloadRef.current.click();}
    }, image)

    // Yuklenilen resmin profil resmi olmasi icin
    const avatarHandle = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.addEventListener('load', function(){
            setAvatar(this.result);
        });
        reader.readAsDataURL(file);    
    }

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
                        <label>Profil Resmi</label>
                        <input
                            type="file"
                            onChange={avatarHandle}
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
                    <button onClick={getImage}>Tweeti Oluştur ve İndir</button>
                    <div className="download-url">
                        {image && (<a ref={downloadRef} href={image} download="tweet.png">Tweeti İndir</a>)}
                    </div>
                </ul>
            </div>
            <div className="tweet-container">
                <div className="tweet" ref={ tweetRef }>
                    <div className="tweet-author">
                        {(avatar && <img src={avatar} alt="user" />) || <AvatarLoader />}
                        <div>
                            <div className="name">
                                {name || "Ad Soyad"}
                                {isVerified && <VerifiedIcon width="19" height="19" />}
                            </div>
                            <div className="username">@{userName || "username"}</div>
                        </div>
                    </div>
                    <div className="tweet-content">
                        {/* JS icerisine HTML injection edebilmek icin gerekli fonksiyon  */}
                        <p dangerouslySetInnerHTML={{
                            __html:
                                (tweet && tweetFormat(tweet)) ||
                                "Bu alana örnek tweet gelecektir."
                        }}
                        />
                    </div>
                    <div className="tweet-stats">
                        <span><b>{formatNumber(retweets)}</b> Retweet</span>
                        <span><b>{formatNumber(quoteTweets)}</b> Alıntı Tweetler</span>
                        <span><b>{formatNumber(likes)}</b> Beğeni</span>
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