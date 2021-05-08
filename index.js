Web3 = require('web3');
web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));


abi = JSON.parse('[{"constant":true,"inputs":[{"name":"","type":"bytes32"}],"name":"votes","outputs":[{"name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"candidateList","outputs":[{"name":"","type":"bytes32"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"index","type":"uint8"}],"name":"voteForCandidate","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"index","type":"uint8"}],"name":"isValidCandidate","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"index","type":"uint8"}],"name":"totalVotesForCandidate","outputs":[{"name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"inputs":[{"name":"candidates","type":"bytes32[]"}],"payable":false,"stateMutability":"nonpayable","type":"constructor"}]',);

votingContract = web3.eth.contract(abi);

contractInstance = votingContract.at('0x3b08aa4681a7b4757287d9e7afef9fecbf51f782');

id = {0:"candidate-1",1:"candidate-2",2:"candidate-3"};


function voteForCandidate(index){
    contractInstance.voteForCandidate(index,{from:web3.eth.accounts[0], gas:4700000}, function(){
        let div = id[index];
        $("#"+div).html(contractInstance.totalVotesForCandidate.call(index).toString());
    });
}

$(document).ready(function(){
    for(var i=0;i<id.length;i++){
        let value = contractInstance.totalVotesForCandidate.call(i).toNumber();
        $("#"+id[i]).html(value);
    }
});