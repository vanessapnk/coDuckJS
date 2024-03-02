import { ArrowLeft2, Edit } from 'iconsax-react'
import Link from 'next/link'
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "@/components/ui/drawer"
import { Button } from "../ui/button"
import { UserEdit } from '../profile/userEdit'

export function NavInternal({ backLink, editLink }) {
    return (

        <>

            <Drawer>
                <div className="px-4 py-6 flex flex-row gap-2 justify-between items-center border-b-2 dark:border-zinc-900 h-10">
                    <Link href={backLink} >
                        <div className='cursor-pointer'>
                            <ArrowLeft2 size="18" className="dark:text-zinc-200" variant="Linear" />
                        </div>
                    </Link>

                    <DrawerTrigger>
                        <div className='cursor-pointer'>
                            <Edit className="dark:text-zinc-200 " size="18" variant="Linear" />
                        </div>
                    </DrawerTrigger>
                </div >

                <DrawerContent>
                    <DrawerHeader>
                        <DrawerTitle>Edit Your Profile</DrawerTitle>
                        <DrawerDescription>
                            <UserEdit />
                        </DrawerDescription>
                    </DrawerHeader>
                    <DrawerFooter>
                        <DrawerClose className='flex items-center gap-2 content-center justify-center'>
                            <Button className='w-full'>Update</Button>
                            <Button variant="outline">Cancel</Button>
                        </DrawerClose>
                    </DrawerFooter>
                </DrawerContent>
            </Drawer>
        </>
    )
}