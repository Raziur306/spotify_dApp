const { expect } = require("chai");
const { ethers } = require('hardhat');
const { loadFixture } = require("@nomicfoundation/hardhat-network-helpers")

describe("Spotify Contract", () => {

    // varibles
    const title = 'New Song';
    const url = 'http url';
    const revertMessage1 = 'Invalid Title';
    const revertMessage2 = 'Invalid Url';

    //deploy contact
    async function deploySpotifyFixture() {
        const Soptify = await ethers.getContractFactory("Spotify");
        const [owner, addr1, addr2] = await ethers.getSigners();
        const hardhatSpotify = await Soptify.deploy();
        await hardhatSpotify.deployed();

        return { Soptify, hardhatSpotify, owner, addr1, addr2 }
    }



    //update all the music files
    it("Should revert with the right error if title is empty.", async () => {
        const { hardhatSpotify } = await loadFixture(deploySpotifyFixture);
        await expect(hardhatSpotify.updateList('', url)).to.be.revertedWith(revertMessage1);
    });

    it("Should revert with the right error if url is empty.", async () => {
        const { hardhatSpotify } = await loadFixture(deploySpotifyFixture);
        await expect(hardhatSpotify.updateList(title, '')).to.be.revertedWith(revertMessage2);
    });


    //get all music files
    it("Updated music list must be retured.", async () => {
        const { hardhatSpotify } = await loadFixture(deploySpotifyFixture);
        const musicList = await hardhatSpotify.updateList(title, url);
        expect(musicList[0].title).to.equal(title);
        expect(musicList[0].url).to.equal(url);
    });


});
