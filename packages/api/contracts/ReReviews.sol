pragma solidity ^0.5.16;

import "./Owned.sol";

contract ReReviews is Owned {
    // Structure to hold Review
    struct Review {
        uint256 id;
        address reviewer;
        address visitor;
        string name;
        string comments;
        uint256 totalUpvotes;
        uint256 totalRewards;
        uint256 totalDownvotes;
        string ipfsHash;
    }

    // State variables to map the address
    mapping(uint256 => Review) public reviews;
    uint256 reviewCounter;

    //Events to capture Add Review
    event addReviewEvent(
        uint256 indexed _id,
        address indexed _reviewer,
        string _name,
        string _ipfsHash
    );

    // Events to capture viewing the Review
    event viewReviewEvent(
        uint256 indexed _id,
        address indexed _reviewer,
        address indexed _visitor,
        string _name,
        uint256 _totalUpvotes,
        uint256 _totalRewards,
        uint256 _totalDownvotes,
        string _ipfsHash
    );

    //Add a review
    function addReview(
        string _name,
        string _comments,
        string _ipfsHash
    ) public {
        // a new review
        reviewCounter++;

        //store this review
        reviews[reviewCounter] = Review(
            reviewCounter,
            msg.sender,
            0x0,
            _name,
            _comments,
            0,
            0.000,
            0,
            _ipfsHash
        );

        // trigger the event
        addReviewEvent(reviewCounter, msg.sender, _name, _ipfsHash);
    }

    // fetch the number of reviews in the contract
    function getNumberOfReviews() public constant returns (uint256) {
        return reviewCounter;
    }

    // fetch and returns all reviews IDs available for visitor
    function getReviewsToView() public constant returns (uint256[]) {
        // we check whether there is at least one review
        if (reviewCounter == 0) {
            return new uint256[](0);
        }

        // prepare intermediary array
        uint256[] memory reviewIds = new uint256[](reviewCounter);

        uint256 numberOfReviewsForVisit = 0;
        // iterate over reviews
        for (uint256 i = 1; i <= reviewCounter; i++) {
            // keep only the ID of reviews not reviewed yet
            // if (reviews[i].visitor == 0x0) {
            reviewIds[numberOfReviewsForVisit] = reviews[i].id;
            numberOfReviewsForVisit++;
            // }
        }

        // copy the reviewsID array into the smaller forReview array
        uint256[] memory forReview = new uint256[](numberOfReviewsForVisit);
        for (uint256 j = 0; j < numberOfReviewsForVisit; j++) {
            forReview[j] = reviewIds[j];
        }
        return (forReview);
    }

    // View a review & upvote/downvote it
    function viewReview(
        uint256 _id,
        uint256 _totalUp,
        uint256 _totalDown
    ) public payable {
        // we check whether there is at least one review
        require(reviewCounter > 0);
        // we check whether the review exists
        require(_id > 0 && _id <= reviewCounter);

        // we retrieve the review
        Review storage review = reviews[_id];
        if (_totalUp == 1) {
            review.totalUpvotes = review.totalUpvotes + 1;
            review.totalRewards = review.totalRewards + msg.value;
        }
        if (_totalDown == 1) {
            review.totalDownvotes = review.totalDownvotes + 1;
            review.totalRewards = review.totalRewards - msg.value;
        }

        // we check whether the article has not already been sold
        //require(article.buyer == 0x0);

        // we don't allow the reviewer to upvote/downvote his own reviews
        require(review.reviewer != msg.sender);

        // keep visitor's information
        review.visitor = msg.sender;

        // the visitor can review the Reviews
        review.reviewer.transfer(msg.value);

        // trigger the event
        viewReviewEvent(
            _id,
            review.reviewer,
            review.visitor,
            review.name,
            review.totalUpvotes,
            review.totalRewards,
            review.totalDownvotes,
            review.ipfsHash
        );
    }

    //kill the smart contract
    function kill() onlyOwner {
        selfdestruct(owner);
    }
}
