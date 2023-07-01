import React, { useState } from 'react';

const CommentSection = () => {
    const [comments, setComments] = useState([]);


    const handleAddComment = (comment) => {
        setComments([...comments, comment]);
    };

    return (
        <div className='container'>

            <CommentForm onAddComment={handleAddComment} />

            {comments.map((comment) => (
                <Comment key={comment.id} comment={comment} />
            ))}
        </div>
    );
};

const Comment = ({ comment }) => {
    const [replies, setReplies] = useState([]);
    const [replyFormVisible, setReplyFormVisible] = useState(false);

    const handleAddReply = (reply) => {
        setReplies([...replies, reply]);
    };

    const toggleReplyForm = () => {
        setReplyFormVisible(!replyFormVisible);
    };

    return (
        <div className='comment'>
            <div className='d-flex gap-2 gap-lg-4 justify-content-center align-items-center mb-3'>
                <div className='col-2 col-md-1 col-lg-2 text-end text-white'><span className='rounded-circle bg-primary' style={{ padding: "10px 15px" }}>N</span></div>
                <p className='col-10 col-md-11 col-lg-10'>{comment.text}</p>
            </div>
            {replies.map((reply) => (
                <Reply key={reply.id} reply={reply} />
            ))}
            <div className='d-flex gap-2 justify-content-start align-items-center'>
                {replyFormVisible && <ReplyForm onAddReply={handleAddReply} />}

                {replyFormVisible ? (
                    <div className='col-3 text-start'>
                        <button className='btn btn-outline-primary' onClick={toggleReplyForm}>
                            Cancel
                        </button>
                    </div>) : (
                    <div className='col-3 col-md-2 col-lg-3 text-end'>
                        <button className='btn btn-outline-primary' onClick={toggleReplyForm}>
                            Reply
                        </button>
                    </div>)}
            </div>
        </div>
    );
};

const Reply = ({ reply }) => {
    return (
        <div className='d-flex gap-2 gap-lg-4 justify-content-center align-items-center mb-3 ms-3 ms-lg-0'>
            <div className='col-2 col-md-2 col-lg-2 text-end text-white'><span className='rounded-circle bg-primary' style={{ padding: "10px 15px" }}>N</span></div>
            <p className='col-10 col-md-11 col-lg-9'>{reply.text}</p>
        </div>
    );
};

const CommentForm = ({ onAddComment }) => {
    const [text, setText] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        const comment = {
            id: Date.now(),
            text,
        };
        onAddComment(comment);
        setText('');
    };

    return (
        <form className='row justify-content-center py-5' onSubmit={handleSubmit}>
            <div className='col-7 col-lg-6'>
                <input
                    type="text"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder="Add a comment..."
                    className='form-control'
                />
            </div>
            <div className='col-4 col-lg-3'>
                <button type="submit" className="btn btn-outline-primary">Comment</button>
            </div>
        </form>
    );
};

const ReplyForm = ({ onAddReply }) => {
    const [text, setText] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        const reply = {
            id: Date.now(),
            text,
        };
        onAddReply(reply);
        setText('');
    };

    return (
        <>
        <div className='col-1 col-lg-2'></div>
        <div className='col-6'>
            <form className='d-flex gap-2 justify-content-start' onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder="Add a reply..."
                    className='form-control'
                />
                <button className='btn btn-outline-primary' type="submit">Reply</button>
            </form>
        </div>
        </>
    );
};

export default CommentSection;