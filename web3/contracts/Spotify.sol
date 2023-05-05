// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.9;

contract Spotify {
    struct MusicFile {
        string title;
        string url;
    }

    MusicFile[] musics;

    function getMusic() public view returns (MusicFile[] memory) {
        return musics;
    }

    function updateList(string memory title, string memory url) public returns(MusicFile[] memory) {
        require(bytes(title).length > 0, "Invalid Title");
        require(bytes(url).length > 0, "Invalid Url");
        musics.push(MusicFile(title, url));
        return musics;
    }
}
