import React, { useCallback, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Button, Input, Select, RTE } from '../index';
import appwriteService from '../../appwrite/appwriteConfig';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

function PostForm({ post }) {
    const navigate = useNavigate();
    const { register, handleSubmit, watch, setValue, control, getValues } = useForm({
        defaultValues: {
            title: post?.title || '',
            slug: post?.$id || '',
            content: post?.content || '',
            status: post?.status || 'active'
        }
    });

    const userData = useSelector(state => state.auth.userData);

    useEffect(() => {
        console.log("posts are: ", post);
    }, [post]);

    const submit = async(data) => {
        if(post) {
            const file = data.image[0] ? appwriteService.fileUpload(data.image[0]) : null;

            if(file) {
                appwriteService.fileDelete(post.featuredImage);
            }

            const dbPost = await appwriteService.updatePost(post.$id, {
                ...data,
                featuredImage: file? file.$id : undefined,
            });

            if(dbPost) {
                navigate(`/post/${dbPost.$id}`);
            }

        } else {
            const file = await appwriteService.fileUpload(data.image[0]);
            if(file) {
                const field = file.$id;
                data.featuredImage = field;
                console.log("field is: ", field);

                const dbPost = await appwriteService.createPost({
                    ...data,
                    userId: userData.$id
                });

                if(dbPost) {
                    navigate(`/post/${dbPost.$id}`);
                }
            }

        }
    }

    const slugTranform = useCallback((value) => {
        if(value && typeof value === 'string') {
            return value
                .trim()
                .toLowerCase()
                .replace(/[^a-zA-Z\d\s]+/g, "-")
                .replace(/\s/g, "-");
        }
        return "";
    }, []);

    useEffect(() => {
        console.log("post is: ", post);
    }, post);

    useEffect(() => {
        const subscription = watch((value, {name}) => {
            if(name === 'title') {
                setValue('slug', slugTranform(value.title));
                { shouldValidate: true }
            } 
        });

        return () => {
            subscription.unsubscribe();
        }
    }, [watch, slugTranform, setValue]);

    return (
        <form onSubmit={handleSubmit(submit)} className='flex flex-wrap'>
            <div className='w-2/3 px-2'>
                <Input
                    label="Title: "
                    placeholder="Title..."
                    className="mb-4"
                    {...register("title", {
                        required: true,
                    })}
                />
                <Input
                    label="Slug: "
                    placeholder="Slug..."
                    className="mb-4"
                    {...register("slug", {
                        required: true
                    })}

                    onInput={(e) => {
                        setValue("slug", slugTranform(e.currentTarget.value), {
                            shouldValidate: true
                        })
                    }}
                />
                <RTE label="Content..." name="content" control={control} defaultValue={getValues("content")} />
            </div>
            <div className='w-1/3 px-2'>
                <Input
                    label="Featured Image: "
                    type="file"
                    className="mb-4"
                    accept="image/png, image/jpg, image/jpeg, image/gif"
                    {...register("image", {
                        required: !post
                    })}
                />
                {post && (
                    <div className='w-full mb-4'>
                        <img
                            src={appwriteService.filePreview(post.featuredImage)}
                            alt={post.title}
                            className='rounded-lg'
                        />
                    </div>
                )}

                <Select
                    options={["active", "inactive"]}
                    label="status"
                    className="mb-4"
                    {...register('status', {
                        required: true
                    })}
                />
                <Button type="submit" bgColor={post ? "bg-green-500" : undefined} className='w-full'>
                    {post ? "Update" : "Submit"}
                </Button>
            </div>
        </form>
    )
}

export default PostForm