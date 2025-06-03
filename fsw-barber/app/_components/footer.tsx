import React from 'react'
import { Card, CardContent } from "./ui/card";

const Footer = () => {
    return (
        <footer>
        <Card>
          <CardContent className="px-5 py-6">
            <p className="text-gray-400 text-sm">
              @ 2024 Copyright <span className="font-bold">Evandro Balles</span>
            </p>
          </CardContent>
        </Card>
      </footer>
    )
}

export default Footer;