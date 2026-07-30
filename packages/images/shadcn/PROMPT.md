### Runtime: `@aprovan/patchwork-image-shadcn`

React 18 + shadcn/ui + Tailwind CSS, running sandboxed in the browser.

**Imports you may use**

- `react` — hooks and component APIs.
- shadcn/ui components via `@/components/ui/<name>`, e.g. `import { Button } from '@/components/ui/button'`; `cn` from `@/lib/utils`. The available names are listed below — that list is exhaustive.
- `lucide-react` — icons, e.g. `import { Loader2, Check } from 'lucide-react'`.
- Nothing else unless the user asks; prefer hand-rolled markup over extra packages.

**Available components**

<!-- BEGIN generated components -->

Components (245) — import any of these from
`@/components/ui/<anything>`; the path after `ui/` is not resolved, only the
named import matters:

- `Accordion`, `AccordionContent`, `AccordionItem`, `AccordionTrigger`, `Alert`, `AlertDescription`, `AlertDialog`, `AlertDialogAction`
- `AlertDialogCancel`, `AlertDialogContent`, `AlertDialogDescription`, `AlertDialogFooter`, `AlertDialogHeader`, `AlertDialogOverlay`, `AlertDialogPortal`, `AlertDialogTitle`
- `AlertDialogTrigger`, `AlertTitle`, `AspectRatio`, `Avatar`, `AvatarFallback`, `AvatarImage`, `Badge`, `Breadcrumb`
- `BreadcrumbEllipsis`, `BreadcrumbItem`, `BreadcrumbLink`, `BreadcrumbList`, `BreadcrumbPage`, `BreadcrumbSeparator`, `Button`, `Calendar`
- `CalendarDayButton`, `Card`, `CardAction`, `CardContent`, `CardDescription`, `CardFooter`, `CardHeader`, `CardTitle`
- `Carousel`, `CarouselContent`, `CarouselItem`, `CarouselNext`, `CarouselPrevious`, `ChartContainer`, `ChartLegend`, `ChartLegendContent`
- `ChartStyle`, `ChartTooltip`, `ChartTooltipContent`, `Checkbox`, `Collapsible`, `CollapsibleContent`, `CollapsibleTrigger`, `Combobox`
- `Command`, `CommandEmpty`, `CommandGroup`, `CommandInput`, `CommandItem`, `CommandList`, `CommandSeparator`, `CommandShortcut`
- `ContextMenu`, `ContextMenuCheckboxItem`, `ContextMenuContent`, `ContextMenuGroup`, `ContextMenuItem`, `ContextMenuLabel`, `ContextMenuPortal`, `ContextMenuRadioGroup`
- `ContextMenuRadioItem`, `ContextMenuSeparator`, `ContextMenuShortcut`, `ContextMenuSub`, `ContextMenuSubContent`, `ContextMenuSubTrigger`, `ContextMenuTrigger`, `DataTable`
- `DateOfBirthPicker`, `DatePicker`, `DatePickerWithLabel`, `DateRangePicker`, `Dialog`, `DialogClose`, `DialogContent`, `DialogDescription`
- `DialogFooter`, `DialogHeader`, `DialogOverlay`, `DialogPortal`, `DialogTitle`, `DialogTrigger`, `Drawer`, `DrawerClose`
- `DrawerContent`, `DrawerDescription`, `DrawerFooter`, `DrawerHeader`, `DrawerOverlay`, `DrawerPortal`, `DrawerTitle`, `DrawerTrigger`
- `DropdownMenu`, `DropdownMenuCheckboxItem`, `DropdownMenuContent`, `DropdownMenuGroup`, `DropdownMenuItem`, `DropdownMenuLabel`, `DropdownMenuPortal`, `DropdownMenuRadioGroup`
- `DropdownMenuRadioItem`, `DropdownMenuSeparator`, `DropdownMenuShortcut`, `DropdownMenuSub`, `DropdownMenuSubContent`, `DropdownMenuSubTrigger`, `DropdownMenuTrigger`, `HoverCard`
- `HoverCardContent`, `HoverCardTrigger`, `Input`, `InputOTP`, `InputOTPGroup`, `InputOTPSeparator`, `InputOTPSlot`, `Label`
- `Menubar`, `MenubarCheckboxItem`, `MenubarContent`, `MenubarGroup`, `MenubarItem`, `MenubarLabel`, `MenubarMenu`, `MenubarPortal`
- `MenubarRadioGroup`, `MenubarRadioItem`, `MenubarSeparator`, `MenubarShortcut`, `MenubarSub`, `MenubarSubContent`, `MenubarSubTrigger`, `MenubarTrigger`
- `NavigationMenu`, `NavigationMenuContent`, `NavigationMenuIndicator`, `NavigationMenuItem`, `NavigationMenuLink`, `NavigationMenuList`, `NavigationMenuTrigger`, `NavigationMenuViewport`
- `Pagination`, `PaginationContent`, `PaginationEllipsis`, `PaginationItem`, `PaginationLink`, `PaginationNext`, `PaginationPrevious`, `Popover`
- `PopoverContent`, `PopoverTrigger`, `Progress`, `RadioGroup`, `RadioGroupItem`, `ResizableHandle`, `ResizablePanel`, `ResizablePanelGroup`
- `ScrollArea`, `ScrollBar`, `Select`, `SelectContent`, `SelectGroup`, `SelectItem`, `SelectLabel`, `SelectScrollDownButton`
- `SelectScrollUpButton`, `SelectSeparator`, `SelectTrigger`, `SelectValue`, `Separator`, `Sheet`, `SheetClose`, `SheetContent`
- `SheetDescription`, `SheetFooter`, `SheetHeader`, `SheetOverlay`, `SheetPortal`, `SheetTitle`, `SheetTrigger`, `Sidebar`
- `SidebarContent`, `SidebarFooter`, `SidebarGroup`, `SidebarGroupContent`, `SidebarGroupLabel`, `SidebarHeader`, `SidebarMenuButton`, `SidebarMenuItem`
- `SidebarProvider`, `SidebarSeparator`, `Skeleton`, `Slider`, `Switch`, `Table`, `TableBody`, `TableCaption`
- `TableCell`, `TableFooter`, `TableHead`, `TableHeader`, `TableRow`, `Tabs`, `TabsContent`, `TabsList`
- `TabsTrigger`, `Textarea`, `Toast`, `ToastAction`, `ToastClose`, `ToastDescription`, `ToastProvider`, `ToastTitle`
- `ToastViewport`, `Toaster`, `Toggle`, `ToggleGroup`, `ToggleGroupItem`, `Tooltip`, `TooltipContent`, `TooltipProvider`
- `TooltipTrigger`, `TypographyBlockquote`, `TypographyH1`, `TypographyH2`, `TypographyH3`, `TypographyH4`, `TypographyInlineCode`, `TypographyLarge`
- `TypographyLead`, `TypographyList`, `TypographyMuted`, `TypographyP`, `TypographySmall`

Helpers: `badgeVariants`, `buttonVariants`, `cn`, `createActionsColumn`, `createSelectColumn`, `createSortableColumn`, `navigationMenuTriggerStyle`, `toggleVariants` (from `@/lib/utils`).

**There is nothing else.** A name not on this list is a compile error, not a
missing install — write the markup by hand instead. In particular there is no
`Spinner`: use `Loader2` from `lucide-react` with `className="animate-spin"`.

<!-- END generated components -->

**Styling**

- Tailwind utility classes only. Use theme tokens (`bg-card`, `text-foreground`, `text-muted-foreground`, `border`, `bg-primary`, …) rather than hard-coded colors like `bg-white`, so widgets render correctly in light and dark mode.
- Spacing, hierarchy, and rounded corners over decoration; no gaudy gradients.

**Constraints**

- No server access from imports — server calls go through the injected SDK namespaces, and `fetch` only against public CORS-enabled APIs, with failure states handled.
- A deeper design reference is available as the `design` doc of this image.
