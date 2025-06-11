'use client'

import { useSession } from 'next-auth/react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useState, useEffect } from 'react'

import Profile from '@/components/Profile'

const MyProfile = () => {
  const { data: session } = useSession()
  const router = useRouter()
  const searchParams = useSearchParams()
  const userId = searchParams.get('id') || session?.user.id;
  
  const [posts, setPosts] = useState([])
  const creatorName = posts.length > 0 ? posts[0].creator.username : "User"

  if (router.isFallback) {
    return <div>Loading...</div>
  }

  useEffect(() => {
    const fetchPost = async () => {
      const res = await fetch(`/api/users/${userId}/posts`)
      const data = await res.json()
      
      setPosts(data)
    }
    
    if (userId) {
      fetchPost()
    }
  }, [userId])

  const handleEdit = (post) => {
    router.push(`/update-prompt?id=${post._id}`)
  }
  
  const handleDelete = async (post) => {
    const hasConfirmed = confirm('Are you sure you want to delete this prompt?')

    if (hasConfirmed) {
      try {
        await fetch(`/api/prompt/${post._id.toString()}`, {
          method: 'DELETE'
        })

        const filteredPost = posts.filter(p => p._id !== post._id)
        setPosts(filteredPost)
      } catch (error) {
        console.log(error)
      } 
    }
  }

  return (
    <Profile
      name={creatorName}
      desc='Welcome to your personalized profile page'
      data={posts}
      handleEdit={handleEdit}
      handleDelete={handleDelete}
    />
  )
}

export default MyProfile
