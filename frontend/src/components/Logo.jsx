
function Logo({ width = '5rem' }) {
    const imageURL = "https://github-production-user-asset-6210df.s3.amazonaws.com/74306882/373970971-c96b7e44-6a41-474f-87ca-799ab58d5742.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAVCODYLSA53PQK4ZA%2F20241006%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20241006T182819Z&X-Amz-Expires=300&X-Amz-Signature=c8e38ff4f52ad5f4bb9e1220d586924a442e50ce2b5f860d36fd36c0c4da97b0&X-Amz-SignedHeaders=host";
    return (
        <div className="w-12" width>
            <img src="../../images/logo.png" className="w-full" width onError={(e) => e.target.src = imageURL}/>
        </div>
    );
}

export default Logo;

// https://github-production-user-asset-6210df.s3.amazonaws.com/74306882/373970971-c96b7e44-6a41-474f-87ca-799ab58d5742.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAVCODYLSA53PQK4ZA%2F20241006%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20241006T182819Z&X-Amz-Expires=300&X-Amz-Signature=c8e38ff4f52ad5f4bb9e1220d586924a442e50ce2b5f860d36fd36c0c4da97b0&X-Amz-SignedHeaders=host