/*
build ModalProvider and use in layout to be able to trigger it any where just by change isOpen state through onOpen and OnClose created in useStoreModal
*/

"use client";
import StoreModal from "@/components/modals/StoreModal";
import { useEffect, useState } from "react";

export default function ModalProvider() {
  /* 
   preventing from hydration rendering
   hydration error happens when something happens in server side and the same time something else happens in client side that are not sync, resulting error. so we should make conditions that client component just run when it is mounted otherwise it returns null.
   */

  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <>
      <StoreModal />
    </>
  );
}
