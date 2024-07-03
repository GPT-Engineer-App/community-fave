import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";

const FileFlow = () => {
  const [file, setFile] = useState(null);
  const [peerId, setPeerId] = useState("");

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSendFile = () => {
    if (!file || !peerId) {
      toast.error("Please select a file and enter a peer ID.");
      return;
    }

    // Implement file sending logic here
    toast("File sent successfully!");
  };

  return (
    <div className="container mx-auto p-4">
      <Card>
        <CardHeader>
          <CardTitle>FileFlow</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <Input type="file" onChange={handleFileChange} />
            <Input
              placeholder="Enter Peer ID"
              value={peerId}
              onChange={(e) => setPeerId(e.target.value)}
            />
            <Button onClick={handleSendFile}>Send File</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default FileFlow;