"use client"

import * as React from "react"

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog"
import { AspectRatio } from "@/components/ui/aspect-ratio"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import { Checkbox } from "@/components/ui/checkbox"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { ContextMenu, ContextMenuContent, ContextMenuItem, ContextMenuTrigger } from "@/components/ui/context-menu"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger } from "@/components/ui/drawer"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card"
import { Input } from "@/components/ui/input"
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp"
import { Label } from "@/components/ui/label"
import { Menubar, MenubarContent, MenubarItem, MenubarMenu, MenubarSeparator, MenubarTrigger } from "@/components/ui/menubar"
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger } from "@/components/ui/navigation-menu"
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Progress } from "@/components/ui/progress"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Skeleton } from "@/components/ui/skeleton"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Toggle } from "@/components/ui/toggle"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

import { AlertCircle, Bold, ChevronsUpDown, Italic, Terminal, Underline } from "lucide-react"
import { formatComponentName, getComponentCategory } from "./categories"

export interface ComponentDoc {
  name: string
  slug: string
  description: string
  categories: string[]
  preview: React.ReactNode
  code: string
}

const componentsRegistry: Record<string, ComponentDoc> = {
  accordion: {
    name: "Accordion",
    slug: "accordion",
    description: "A vertically stacked set of interactive headings that each reveal a section of content.",
    categories: getComponentCategory("accordion"),
    preview: (
      <Accordion type="single" collapsible className="w-full max-w-md">
        <AccordionItem value="item-1">
          <AccordionTrigger>Is it accessible?</AccordionTrigger>
          <AccordionContent>Yes. It adheres to the WAI-ARIA design pattern.</AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger>Is it styled?</AccordionTrigger>
          <AccordionContent>Yes. It comes with default styles that matches the other components.</AccordionContent>
        </AccordionItem>
      </Accordion>
    ),
    code: `import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

<Accordion type="single" collapsible>
  <AccordionItem value="item-1">
    <AccordionTrigger>Is it accessible?</AccordionTrigger>
    <AccordionContent>
      Yes. It adheres to the WAI-ARIA design pattern.
    </AccordionContent>
  </AccordionItem>
</Accordion>`,
  },
  alert: {
    name: "Alert",
    slug: "alert",
    description: "Displays a callout for user attention.",
    categories: getComponentCategory("alert"),
    preview: (
      <div className="w-full max-w-md space-y-4">
        <Alert>
          <Terminal className="h-4 w-4" />
          <AlertTitle>Heads up!</AlertTitle>
          <AlertDescription>You can add components to your app using the cli.</AlertDescription>
        </Alert>
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>Your session has expired. Please log in again.</AlertDescription>
        </Alert>
      </div>
    ),
    code: `import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

<Alert>
  <Terminal className="h-4 w-4" />
  <AlertTitle>Heads up!</AlertTitle>
  <AlertDescription>
    You can add components to your app using the cli.
  </AlertDescription>
</Alert>`,
  },
  "alert-dialog": {
    name: "Alert Dialog",
    slug: "alert-dialog",
    description: "A modal dialog that interrupts the user with important content and expects a response.",
    categories: getComponentCategory("alert-dialog"),
    preview: (
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button variant="outline">Delete Account</Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>This action cannot be undone.</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction>Continue</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    ),
    code: `import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog"

<AlertDialog>
  <AlertDialogTrigger asChild>
    <Button variant="outline">Delete Account</Button>
  </AlertDialogTrigger>
  <AlertDialogContent>
    <AlertDialogHeader>
      <AlertDialogTitle>Are you sure?</AlertDialogTitle>
      <AlertDialogDescription>This action cannot be undone.</AlertDialogDescription>
    </AlertDialogHeader>
    <AlertDialogFooter>
      <AlertDialogCancel>Cancel</AlertDialogCancel>
      <AlertDialogAction>Continue</AlertDialogAction>
    </AlertDialogFooter>
  </AlertDialogContent>
</AlertDialog>`,
  },
  "aspect-ratio": {
    name: "Aspect Ratio",
    slug: "aspect-ratio",
    description: "Displays content within a desired ratio.",
    categories: getComponentCategory("aspect-ratio"),
    preview: (
      <div className="w-full max-w-md">
        <AspectRatio ratio={16 / 9} className="bg-muted rounded-md flex items-center justify-center">
          <span className="text-muted-foreground">16:9</span>
        </AspectRatio>
      </div>
    ),
    code: `import { AspectRatio } from "@/components/ui/aspect-ratio"

<AspectRatio ratio={16 / 9} className="bg-muted">
  <img src="..." alt="Image" className="object-cover" />
</AspectRatio>`,
  },
  avatar: {
    name: "Avatar",
    slug: "avatar",
    description: "An image element with a fallback for representing the user.",
    categories: getComponentCategory("avatar"),
    preview: (
      <div className="flex gap-4">
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <Avatar>
          <AvatarFallback>JD</AvatarFallback>
        </Avatar>
      </div>
    ),
    code: `import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

<Avatar>
  <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
  <AvatarFallback>CN</AvatarFallback>
</Avatar>`,
  },
  badge: {
    name: "Badge",
    slug: "badge",
    description: "Displays a badge or a component that looks like a badge.",
    categories: getComponentCategory("badge"),
    preview: (
      <div className="flex gap-2 flex-wrap">
        <Badge>Default</Badge>
        <Badge variant="secondary">Secondary</Badge>
        <Badge variant="outline">Outline</Badge>
        <Badge variant="destructive">Destructive</Badge>
      </div>
    ),
    code: `import { Badge } from "@/components/ui/badge"

<Badge>Default</Badge>
<Badge variant="secondary">Secondary</Badge>
<Badge variant="outline">Outline</Badge>
<Badge variant="destructive">Destructive</Badge>`,
  },
  breadcrumb: {
    name: "Breadcrumb",
    slug: "breadcrumb",
    description: "Displays the path to the current resource using a hierarchy of links.",
    categories: getComponentCategory("breadcrumb"),
    preview: (
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="/docs">Docs</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Breadcrumb</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
    ),
    code: `import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb"

<Breadcrumb>
  <BreadcrumbList>
    <BreadcrumbItem>
      <BreadcrumbLink href="/">Home</BreadcrumbLink>
    </BreadcrumbItem>
    <BreadcrumbSeparator />
    <BreadcrumbItem>
      <BreadcrumbPage>Current</BreadcrumbPage>
    </BreadcrumbItem>
  </BreadcrumbList>
</Breadcrumb>`,
  },
  button: {
    name: "Button",
    slug: "button",
    description: "Displays a button or a component that looks like a button.",
    categories: getComponentCategory("button"),
    preview: (
      <div className="flex gap-2 flex-wrap">
        <Button>Default</Button>
        <Button variant="secondary">Secondary</Button>
        <Button variant="outline">Outline</Button>
        <Button variant="ghost">Ghost</Button>
        <Button variant="destructive">Destructive</Button>
        <Button variant="link">Link</Button>
      </div>
    ),
    code: `import { Button } from "@/components/ui/button"

<Button>Default</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="outline">Outline</Button>
<Button variant="ghost">Ghost</Button>
<Button variant="destructive">Destructive</Button>`,
  },
  calendar: {
    name: "Calendar",
    slug: "calendar",
    description: "A date field component that allows users to enter and edit date.",
    categories: getComponentCategory("calendar"),
    preview: <Calendar mode="single" className="rounded-md border" />,
    code: `import { Calendar } from "@/components/ui/calendar"
import { useState } from "react"

const [date, setDate] = useState<Date | undefined>(new Date())

<Calendar
  mode="single"
  selected={date}
  onSelect={setDate}
  className="rounded-md border"
/>`,
  },
  card: {
    name: "Card",
    slug: "card",
    description: "Displays a card with header, content, and footer.",
    categories: getComponentCategory("card"),
    preview: (
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>Card Title</CardTitle>
          <CardDescription>Card Description</CardDescription>
        </CardHeader>
        <CardContent>
          <p>Card Content</p>
        </CardContent>
        <CardFooter>
          <Button>Action</Button>
        </CardFooter>
      </Card>
    ),
    code: `import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

<Card>
  <CardHeader>
    <CardTitle>Card Title</CardTitle>
    <CardDescription>Card Description</CardDescription>
  </CardHeader>
  <CardContent>
    <p>Card Content</p>
  </CardContent>
  <CardFooter>
    <Button>Action</Button>
  </CardFooter>
</Card>`,
  },
  carousel: {
    name: "Carousel",
    slug: "carousel",
    description: "A carousel with motion and swipe built using Embla.",
    categories: getComponentCategory("carousel"),
    preview: (
      <Carousel className="w-full max-w-xs">
        <CarouselContent>
          {[1, 2, 3].map((i) => (
            <CarouselItem key={i}>
              <div className="p-1">
                <Card>
                  <CardContent className="flex aspect-square items-center justify-center p-6">
                    <span className="text-4xl font-semibold">{i}</span>
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    ),
    code: `import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"

<Carousel>
  <CarouselContent>
    <CarouselItem>...</CarouselItem>
    <CarouselItem>...</CarouselItem>
  </CarouselContent>
  <CarouselPrevious />
  <CarouselNext />
</Carousel>`,
  },
  checkbox: {
    name: "Checkbox",
    slug: "checkbox",
    description: "A control that allows the user to toggle between checked and not checked.",
    categories: getComponentCategory("checkbox"),
    preview: (
      <div className="flex items-center space-x-2">
        <Checkbox id="terms" />
        <Label htmlFor="terms">Accept terms and conditions</Label>
      </div>
    ),
    code: `import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"

<div className="flex items-center space-x-2">
  <Checkbox id="terms" />
  <Label htmlFor="terms">Accept terms and conditions</Label>
</div>`,
  },
  collapsible: {
    name: "Collapsible",
    slug: "collapsible",
    description: "An interactive component which expands/collapses a panel.",
    categories: getComponentCategory("collapsible"),
    preview: (
      <Collapsible className="w-full max-w-sm">
        <div className="flex items-center justify-between space-x-4 px-4">
          <h4 className="text-sm font-semibold">@peduarte starred 3 repositories</h4>
          <CollapsibleTrigger asChild>
            <Button variant="ghost" size="sm">
              <ChevronsUpDown className="h-4 w-4" />
            </Button>
          </CollapsibleTrigger>
        </div>
        <CollapsibleContent className="space-y-2 px-4 pt-2">
          <div className="rounded-md border px-4 py-2 text-sm">@radix-ui/primitives</div>
          <div className="rounded-md border px-4 py-2 text-sm">@radix-ui/colors</div>
        </CollapsibleContent>
      </Collapsible>
    ),
    code: `import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"

<Collapsible>
  <CollapsibleTrigger>Toggle</CollapsibleTrigger>
  <CollapsibleContent>
    Content here
  </CollapsibleContent>
</Collapsible>`,
  },
  command: {
    name: "Command",
    slug: "command",
    description: "Fast, composable, unstyled command menu for React.",
    categories: getComponentCategory("command"),
    preview: (
      <Command className="rounded-lg border shadow-md w-full max-w-sm">
        <CommandInput placeholder="Type a command or search..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Suggestions">
            <CommandItem>Calendar</CommandItem>
            <CommandItem>Search</CommandItem>
            <CommandItem>Settings</CommandItem>
          </CommandGroup>
        </CommandList>
      </Command>
    ),
    code: `import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"

<Command>
  <CommandInput placeholder="Search..." />
  <CommandList>
    <CommandEmpty>No results found.</CommandEmpty>
    <CommandGroup heading="Suggestions">
      <CommandItem>Calendar</CommandItem>
    </CommandGroup>
  </CommandList>
</Command>`,
  },
  "context-menu": {
    name: "Context Menu",
    slug: "context-menu",
    description: "Displays a menu to the user — such as a set of actions or functions — triggered by a button.",
    categories: getComponentCategory("context-menu"),
    preview: (
      <ContextMenu>
        <ContextMenuTrigger className="flex h-[150px] w-[300px] items-center justify-center rounded-md border border-dashed text-sm">
          Right click here
        </ContextMenuTrigger>
        <ContextMenuContent className="w-64">
          <ContextMenuItem>Back</ContextMenuItem>
          <ContextMenuItem>Forward</ContextMenuItem>
          <ContextMenuItem>Reload</ContextMenuItem>
        </ContextMenuContent>
      </ContextMenu>
    ),
    code: `import { ContextMenu, ContextMenuContent, ContextMenuItem, ContextMenuTrigger } from "@/components/ui/context-menu"

<ContextMenu>
  <ContextMenuTrigger>Right click here</ContextMenuTrigger>
  <ContextMenuContent>
    <ContextMenuItem>Back</ContextMenuItem>
    <ContextMenuItem>Forward</ContextMenuItem>
  </ContextMenuContent>
</ContextMenu>`,
  },
  dialog: {
    name: "Dialog",
    slug: "dialog",
    description: "A window overlaid on either the primary window or another dialog window.",
    categories: getComponentCategory("dialog"),
    preview: (
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline">Open Dialog</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit profile</DialogTitle>
            <DialogDescription>Make changes to your profile here.</DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <Input placeholder="Name" />
          </div>
          <DialogFooter>
            <Button type="submit">Save changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    ),
    code: `import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"

<Dialog>
  <DialogTrigger asChild>
    <Button variant="outline">Open</Button>
  </DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Title</DialogTitle>
      <DialogDescription>Description</DialogDescription>
    </DialogHeader>
    <DialogFooter>
      <Button>Save</Button>
    </DialogFooter>
  </DialogContent>
</Dialog>`,
  },
  drawer: {
    name: "Drawer",
    slug: "drawer",
    description: "A drawer component for React.",
    categories: getComponentCategory("drawer"),
    preview: (
      <Drawer>
        <DrawerTrigger asChild>
          <Button variant="outline">Open Drawer</Button>
        </DrawerTrigger>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>Are you sure?</DrawerTitle>
            <DrawerDescription>This action cannot be undone.</DrawerDescription>
          </DrawerHeader>
          <DrawerFooter>
            <Button>Submit</Button>
            <DrawerClose asChild>
              <Button variant="outline">Cancel</Button>
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    ),
    code: `import { Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger } from "@/components/ui/drawer"

<Drawer>
  <DrawerTrigger>Open</DrawerTrigger>
  <DrawerContent>
    <DrawerHeader>
      <DrawerTitle>Title</DrawerTitle>
      <DrawerDescription>Description</DrawerDescription>
    </DrawerHeader>
    <DrawerFooter>
      <Button>Submit</Button>
      <DrawerClose>Cancel</DrawerClose>
    </DrawerFooter>
  </DrawerContent>
</Drawer>`,
  },
  "dropdown-menu": {
    name: "Dropdown Menu",
    slug: "dropdown-menu",
    description: "Displays a menu to the user — such as a set of actions or functions — triggered by a button.",
    categories: getComponentCategory("dropdown-menu"),
    preview: (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline">Open Menu</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>Profile</DropdownMenuItem>
          <DropdownMenuItem>Settings</DropdownMenuItem>
          <DropdownMenuItem>Logout</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    ),
    code: `import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

<DropdownMenu>
  <DropdownMenuTrigger asChild>
    <Button>Open</Button>
  </DropdownMenuTrigger>
  <DropdownMenuContent>
    <DropdownMenuLabel>My Account</DropdownMenuLabel>
    <DropdownMenuSeparator />
    <DropdownMenuItem>Profile</DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>`,
  },
  form: {
    name: "Form",
    slug: "form",
    description: "Building forms with React Hook Form and Zod.",
    categories: getComponentCategory("form"),
    preview: (
      <div className="w-full max-w-sm space-y-4">
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" placeholder="email@example.com" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <Input id="password" type="password" />
        </div>
        <Button className="w-full">Submit</Button>
      </div>
    ),
    code: `import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"

const formSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
})

// See shadcn/ui docs for full Form component usage`,
  },
  "hover-card": {
    name: "Hover Card",
    slug: "hover-card",
    description: "For sighted users to preview content available behind a link.",
    categories: getComponentCategory("hover-card"),
    preview: (
      <HoverCard>
        <HoverCardTrigger asChild>
          <Button variant="link">@nextjs</Button>
        </HoverCardTrigger>
        <HoverCardContent className="w-80">
          <div className="flex justify-between space-x-4">
            <Avatar>
              <AvatarImage src="https://github.com/vercel.png" />
              <AvatarFallback>VC</AvatarFallback>
            </Avatar>
            <div className="space-y-1">
              <h4 className="text-sm font-semibold">@nextjs</h4>
              <p className="text-sm">The React Framework for the Web.</p>
            </div>
          </div>
        </HoverCardContent>
      </HoverCard>
    ),
    code: `import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card"

<HoverCard>
  <HoverCardTrigger>Hover me</HoverCardTrigger>
  <HoverCardContent>
    Content here
  </HoverCardContent>
</HoverCard>`,
  },
  input: {
    name: "Input",
    slug: "input",
    description: "Displays a form input field or a component that looks like an input field.",
    categories: getComponentCategory("input"),
    preview: (
      <div className="w-full max-w-sm space-y-4">
        <Input type="text" placeholder="Text input" />
        <Input type="email" placeholder="Email" />
        <Input type="password" placeholder="Password" />
        <Input disabled placeholder="Disabled" />
      </div>
    ),
    code: `import { Input } from "@/components/ui/input"

<Input type="text" placeholder="Enter text..." />
<Input type="email" placeholder="Email" />
<Input disabled placeholder="Disabled" />`,
  },
  "input-otp": {
    name: "Input OTP",
    slug: "input-otp",
    description: "Accessible one-time password component with copy paste functionality.",
    categories: getComponentCategory("input-otp"),
    preview: (
      <InputOTP maxLength={6}>
        <InputOTPGroup>
          <InputOTPSlot index={0} />
          <InputOTPSlot index={1} />
          <InputOTPSlot index={2} />
          <InputOTPSlot index={3} />
          <InputOTPSlot index={4} />
          <InputOTPSlot index={5} />
        </InputOTPGroup>
      </InputOTP>
    ),
    code: `import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp"

<InputOTP maxLength={6}>
  <InputOTPGroup>
    <InputOTPSlot index={0} />
    <InputOTPSlot index={1} />
    <InputOTPSlot index={2} />
  </InputOTPGroup>
</InputOTP>`,
  },
  label: {
    name: "Label",
    slug: "label",
    description: "Renders an accessible label associated with controls.",
    categories: getComponentCategory("label"),
    preview: (
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input id="email" type="email" placeholder="Enter your email" />
      </div>
    ),
    code: `import { Label } from "@/components/ui/label"

<Label htmlFor="email">Email</Label>
<Input id="email" type="email" />`,
  },
  menubar: {
    name: "Menubar",
    slug: "menubar",
    description: "A visually persistent menu common in desktop applications.",
    categories: getComponentCategory("menubar"),
    preview: (
      <Menubar>
        <MenubarMenu>
          <MenubarTrigger>File</MenubarTrigger>
          <MenubarContent>
            <MenubarItem>New Tab</MenubarItem>
            <MenubarItem>New Window</MenubarItem>
            <MenubarSeparator />
            <MenubarItem>Print</MenubarItem>
          </MenubarContent>
        </MenubarMenu>
        <MenubarMenu>
          <MenubarTrigger>Edit</MenubarTrigger>
          <MenubarContent>
            <MenubarItem>Undo</MenubarItem>
            <MenubarItem>Redo</MenubarItem>
          </MenubarContent>
        </MenubarMenu>
      </Menubar>
    ),
    code: `import { Menubar, MenubarContent, MenubarItem, MenubarMenu, MenubarSeparator, MenubarTrigger } from "@/components/ui/menubar"

<Menubar>
  <MenubarMenu>
    <MenubarTrigger>File</MenubarTrigger>
    <MenubarContent>
      <MenubarItem>New</MenubarItem>
    </MenubarContent>
  </MenubarMenu>
</Menubar>`,
  },
  "navigation-menu": {
    name: "Navigation Menu",
    slug: "navigation-menu",
    description: "A collection of links for navigating websites.",
    categories: getComponentCategory("navigation-menu"),
    preview: (
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger>Getting started</NavigationMenuTrigger>
            <NavigationMenuContent>
              <div className="grid gap-3 p-4 w-[400px]">
                <NavigationMenuLink href="#">Introduction</NavigationMenuLink>
                <NavigationMenuLink href="#">Installation</NavigationMenuLink>
              </div>
            </NavigationMenuContent>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuLink href="#">Documentation</NavigationMenuLink>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    ),
    code: `import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger } from "@/components/ui/navigation-menu"

<NavigationMenu>
  <NavigationMenuList>
    <NavigationMenuItem>
      <NavigationMenuTrigger>Item</NavigationMenuTrigger>
      <NavigationMenuContent>
        <NavigationMenuLink>Link</NavigationMenuLink>
      </NavigationMenuContent>
    </NavigationMenuItem>
  </NavigationMenuList>
</NavigationMenu>`,
  },
  pagination: {
    name: "Pagination",
    slug: "pagination",
    description: "Pagination with page navigation, next and previous links.",
    categories: getComponentCategory("pagination"),
    preview: (
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious href="#" />
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#">1</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#" isActive>2</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#">3</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationNext href="#" />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    ),
    code: `import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination"

<Pagination>
  <PaginationContent>
    <PaginationItem>
      <PaginationPrevious href="#" />
    </PaginationItem>
    <PaginationItem>
      <PaginationLink href="#">1</PaginationLink>
    </PaginationItem>
    <PaginationItem>
      <PaginationNext href="#" />
    </PaginationItem>
  </PaginationContent>
</Pagination>`,
  },
  popover: {
    name: "Popover",
    slug: "popover",
    description: "Displays rich content in a portal, triggered by a button.",
    categories: getComponentCategory("popover"),
    preview: (
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline">Open popover</Button>
        </PopoverTrigger>
        <PopoverContent className="w-80">
          <div className="grid gap-4">
            <div className="space-y-2">
              <h4 className="font-medium leading-none">Dimensions</h4>
              <p className="text-sm text-muted-foreground">Set the dimensions for the layer.</p>
            </div>
          </div>
        </PopoverContent>
      </Popover>
    ),
    code: `import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

<Popover>
  <PopoverTrigger>Open</PopoverTrigger>
  <PopoverContent>
    Content here
  </PopoverContent>
</Popover>`,
  },
  progress: {
    name: "Progress",
    slug: "progress",
    description: "Displays an indicator showing the completion progress of a task.",
    categories: getComponentCategory("progress"),
    preview: (
      <div className="w-full max-w-md space-y-4">
        <Progress value={33} />
        <Progress value={66} />
        <Progress value={100} />
      </div>
    ),
    code: `import { Progress } from "@/components/ui/progress"

<Progress value={33} />`,
  },
  "radio-group": {
    name: "Radio Group",
    slug: "radio-group",
    description: "A set of checkable buttons where only one can be checked at a time.",
    categories: getComponentCategory("radio-group"),
    preview: (
      <RadioGroup defaultValue="option-one">
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="option-one" id="option-one" />
          <Label htmlFor="option-one">Option One</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="option-two" id="option-two" />
          <Label htmlFor="option-two">Option Two</Label>
        </div>
      </RadioGroup>
    ),
    code: `import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

<RadioGroup defaultValue="option-one">
  <div className="flex items-center space-x-2">
    <RadioGroupItem value="option-one" id="option-one" />
    <Label htmlFor="option-one">Option One</Label>
  </div>
</RadioGroup>`,
  },
  "scroll-area": {
    name: "Scroll Area",
    slug: "scroll-area",
    description: "Augments native scroll functionality for custom, cross-browser styling.",
    categories: getComponentCategory("scroll-area"),
    preview: (
      <ScrollArea className="h-[200px] w-[350px] rounded-md border p-4">
        <div className="space-y-4">
          {Array.from({ length: 10 }).map((_, i) => (
            <div key={i} className="text-sm">
              Item {i + 1} - Lorem ipsum dolor sit amet
            </div>
          ))}
        </div>
      </ScrollArea>
    ),
    code: `import { ScrollArea } from "@/components/ui/scroll-area"

<ScrollArea className="h-[200px] w-[350px] rounded-md border p-4">
  {/* Content here */}
</ScrollArea>`,
  },
  select: {
    name: "Select",
    slug: "select",
    description: "Displays a list of options for the user to pick from.",
    categories: getComponentCategory("select"),
    preview: (
      <Select>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Select a fruit" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="apple">Apple</SelectItem>
          <SelectItem value="banana">Banana</SelectItem>
          <SelectItem value="orange">Orange</SelectItem>
        </SelectContent>
      </Select>
    ),
    code: `import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

<Select>
  <SelectTrigger>
    <SelectValue placeholder="Select..." />
  </SelectTrigger>
  <SelectContent>
    <SelectItem value="apple">Apple</SelectItem>
  </SelectContent>
</Select>`,
  },
  separator: {
    name: "Separator",
    slug: "separator",
    description: "Visually or semantically separates content.",
    categories: getComponentCategory("separator"),
    preview: (
      <div className="w-full max-w-md">
        <div className="space-y-1">
          <h4 className="text-sm font-medium leading-none">Radix Primitives</h4>
          <p className="text-sm text-muted-foreground">An open-source UI component library.</p>
        </div>
        <Separator className="my-4" />
        <div className="flex h-5 items-center space-x-4 text-sm">
          <div>Blog</div>
          <Separator orientation="vertical" />
          <div>Docs</div>
          <Separator orientation="vertical" />
          <div>Source</div>
        </div>
      </div>
    ),
    code: `import { Separator } from "@/components/ui/separator"

<Separator />
<Separator orientation="vertical" />`,
  },
  sheet: {
    name: "Sheet",
    slug: "sheet",
    description: "Extends the Dialog component to display content that complements the main content of the screen.",
    categories: getComponentCategory("sheet"),
    preview: (
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline">Open Sheet</Button>
        </SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Edit profile</SheetTitle>
            <SheetDescription>Make changes to your profile here.</SheetDescription>
          </SheetHeader>
        </SheetContent>
      </Sheet>
    ),
    code: `import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"

<Sheet>
  <SheetTrigger>Open</SheetTrigger>
  <SheetContent>
    <SheetHeader>
      <SheetTitle>Title</SheetTitle>
      <SheetDescription>Description</SheetDescription>
    </SheetHeader>
  </SheetContent>
</Sheet>`,
  },
  skeleton: {
    name: "Skeleton",
    slug: "skeleton",
    description: "Use to show a placeholder while content is loading.",
    categories: getComponentCategory("skeleton"),
    preview: (
      <div className="flex items-center space-x-4">
        <Skeleton className="h-12 w-12 rounded-full" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-[250px]" />
          <Skeleton className="h-4 w-[200px]" />
        </div>
      </div>
    ),
    code: `import { Skeleton } from "@/components/ui/skeleton"

<Skeleton className="h-12 w-12 rounded-full" />
<Skeleton className="h-4 w-[250px]" />`,
  },
  slider: {
    name: "Slider",
    slug: "slider",
    description: "An input where the user selects a value from within a given range.",
    categories: getComponentCategory("slider"),
    preview: (
      <div className="w-full max-w-sm space-y-4">
        <Slider defaultValue={[50]} max={100} step={1} />
        <Slider defaultValue={[25, 75]} max={100} step={1} />
      </div>
    ),
    code: `import { Slider } from "@/components/ui/slider"

<Slider defaultValue={[50]} max={100} step={1} />`,
  },
  sonner: {
    name: "Sonner",
    slug: "sonner",
    description: "An opinionated toast component for React.",
    categories: getComponentCategory("sonner"),
    preview: (
      <div className="flex gap-2">
        <Button variant="outline" onClick={() => {}}>
          Show Toast
        </Button>
      </div>
    ),
    code: `import { toast } from "sonner"

// In your component
<Button onClick={() => toast("Event has been created")}>
  Show Toast
</Button>

// Don't forget to add <Toaster /> in your layout`,
  },
  switch: {
    name: "Switch",
    slug: "switch",
    description: "A control that allows the user to toggle between checked and not checked.",
    categories: getComponentCategory("switch"),
    preview: (
      <div className="flex items-center space-x-2">
        <Switch id="airplane-mode" />
        <Label htmlFor="airplane-mode">Airplane Mode</Label>
      </div>
    ),
    code: `import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"

<div className="flex items-center space-x-2">
  <Switch id="airplane-mode" />
  <Label htmlFor="airplane-mode">Airplane Mode</Label>
</div>`,
  },
  table: {
    name: "Table",
    slug: "table",
    description: "A responsive table component.",
    categories: getComponentCategory("table"),
    preview: (
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Invoice</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Amount</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell className="font-medium">INV001</TableCell>
            <TableCell>Paid</TableCell>
            <TableCell className="text-right">$250.00</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-medium">INV002</TableCell>
            <TableCell>Pending</TableCell>
            <TableCell className="text-right">$150.00</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    ),
    code: `import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

<Table>
  <TableHeader>
    <TableRow>
      <TableHead>Invoice</TableHead>
      <TableHead>Status</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    <TableRow>
      <TableCell>INV001</TableCell>
      <TableCell>Paid</TableCell>
    </TableRow>
  </TableBody>
</Table>`,
  },
  tabs: {
    name: "Tabs",
    slug: "tabs",
    description: "A set of layered sections of content displayed one at a time.",
    categories: getComponentCategory("tabs"),
    preview: (
      <Tabs defaultValue="account" className="w-full max-w-md">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="account">Account</TabsTrigger>
          <TabsTrigger value="password">Password</TabsTrigger>
        </TabsList>
        <TabsContent value="account">
          <Card>
            <CardHeader>
              <CardTitle>Account</CardTitle>
              <CardDescription>Make changes to your account here.</CardDescription>
            </CardHeader>
          </Card>
        </TabsContent>
        <TabsContent value="password">
          <Card>
            <CardHeader>
              <CardTitle>Password</CardTitle>
              <CardDescription>Change your password here.</CardDescription>
            </CardHeader>
          </Card>
        </TabsContent>
      </Tabs>
    ),
    code: `import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

<Tabs defaultValue="account">
  <TabsList>
    <TabsTrigger value="account">Account</TabsTrigger>
    <TabsTrigger value="password">Password</TabsTrigger>
  </TabsList>
  <TabsContent value="account">Account content</TabsContent>
  <TabsContent value="password">Password content</TabsContent>
</Tabs>`,
  },
  textarea: {
    name: "Textarea",
    slug: "textarea",
    description: "Displays a form textarea or a component that looks like a textarea.",
    categories: getComponentCategory("textarea"),
    preview: (
      <div className="w-full max-w-sm space-y-2">
        <Label htmlFor="message">Message</Label>
        <Textarea id="message" placeholder="Type your message here." />
      </div>
    ),
    code: `import { Textarea } from "@/components/ui/textarea"

<Textarea placeholder="Type your message here." />`,
  },
  toggle: {
    name: "Toggle",
    slug: "toggle",
    description: "A two-state button that can be either on or off.",
    categories: getComponentCategory("toggle"),
    preview: (
      <div className="flex gap-2">
        <Toggle aria-label="Toggle italic">
          <Bold className="h-4 w-4" />
        </Toggle>
        <Toggle aria-label="Toggle italic">
          <Italic className="h-4 w-4" />
        </Toggle>
        <Toggle aria-label="Toggle underline">
          <Underline className="h-4 w-4" />
        </Toggle>
      </div>
    ),
    code: `import { Toggle } from "@/components/ui/toggle"

<Toggle aria-label="Toggle bold">
  <Bold className="h-4 w-4" />
</Toggle>`,
  },
  "toggle-group": {
    name: "Toggle Group",
    slug: "toggle-group",
    description: "A set of two-state buttons that can be toggled on or off.",
    categories: getComponentCategory("toggle-group"),
    preview: (
      <ToggleGroup type="multiple">
        <ToggleGroupItem value="bold" aria-label="Toggle bold">
          <Bold className="h-4 w-4" />
        </ToggleGroupItem>
        <ToggleGroupItem value="italic" aria-label="Toggle italic">
          <Italic className="h-4 w-4" />
        </ToggleGroupItem>
        <ToggleGroupItem value="underline" aria-label="Toggle underline">
          <Underline className="h-4 w-4" />
        </ToggleGroupItem>
      </ToggleGroup>
    ),
    code: `import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"

<ToggleGroup type="multiple">
  <ToggleGroupItem value="bold">
    <Bold className="h-4 w-4" />
  </ToggleGroupItem>
  <ToggleGroupItem value="italic">
    <Italic className="h-4 w-4" />
  </ToggleGroupItem>
</ToggleGroup>`,
  },
  tooltip: {
    name: "Tooltip",
    slug: "tooltip",
    description: "A popup that displays information related to an element when the element receives keyboard focus or the mouse hovers over it.",
    categories: getComponentCategory("tooltip"),
    preview: (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="outline">Hover me</Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Add to library</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    ),
    code: `import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

<TooltipProvider>
  <Tooltip>
    <TooltipTrigger>Hover</TooltipTrigger>
    <TooltipContent>
      <p>Tooltip content</p>
    </TooltipContent>
  </Tooltip>
</TooltipProvider>`,
  },
}

export function getComponentBySlug(slug: string): ComponentDoc | undefined {
  return componentsRegistry[slug]
}

export function getAllComponents(): ComponentDoc[] {
  return Object.values(componentsRegistry)
}

export { componentsRegistry }
