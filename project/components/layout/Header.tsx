'use client'

import { Bell, Search, User, Settings, HelpCircle, LogOut } from 'lucide-react'
import { ThemeToggle } from '@/components/ui/ThemeToggle'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/80 backdrop-blur-xl supports-[backdrop-filter]:bg-white/60 dark:bg-slate-900/80 dark:supports-[backdrop-filter]:bg-slate-900/60 shadow-sm">
      <div className="container flex h-16 items-center justify-between px-6">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-blue-600 via-blue-700 to-purple-600 flex items-center justify-center shadow-lg">
              <span className="text-white font-bold text-lg">A</span>
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-xl text-slate-900 dark:text-slate-100">
                ADmyBRAND
              </span>
              <span className="text-xs text-slate-500 dark:text-slate-400 -mt-1">
                Insights Dashboard
              </span>
            </div>
            <Badge variant="secondary" className="ml-2 text-xs">
              Pro
            </Badge>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <div className="relative hidden md:block">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <Input
              placeholder="Search campaigns, metrics..."
              className="w-80 pl-10 bg-slate-50 dark:bg-slate-800 border-0 focus:bg-white dark:focus:bg-slate-700 transition-colors"
            />
          </div>
          
          <Button variant="ghost" size="icon" className="relative hover:bg-slate-100 dark:hover:bg-slate-800">
            <Bell className="h-5 w-5" />
            <Badge className="absolute -top-1 -right-1 h-5 w-5 p-0 text-xs bg-red-500 hover:bg-red-500">
              3
            </Badge>
          </Button>
          
          <Button variant="ghost" size="icon" className="hover:bg-slate-100 dark:hover:bg-slate-800">
            <HelpCircle className="h-5 w-5" />
          </Button>
          
          <ThemeToggle />
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                <Avatar className="h-10 w-10">
                  <AvatarImage src="/api/placeholder/40/40" alt="User" />
                  <AvatarFallback className="bg-gradient-to-br from-blue-600 to-purple-600 text-white">
                    JD
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
              <div className="flex items-center justify-start gap-2 p-2">
                <div className="flex flex-col space-y-1 leading-none">
                  <p className="font-medium">John Doe</p>
                  <p className="w-[200px] truncate text-sm text-slate-600 dark:text-slate-400">
                    john.doe@admybrand.com
                  </p>
                </div>
              </div>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <User className="mr-2 h-4 w-4" />
                <span>Profile</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Settings className="mr-2 h-4 w-4" />
                <span>Settings</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <LogOut className="mr-2 h-4 w-4" />
                <span>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  )
}