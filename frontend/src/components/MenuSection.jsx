import React, { useState, useRef, useEffect } from 'react';
import { Leaf, LeafyGreen, Download } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Button } from './ui/button';
import { useLanguage } from '../context/LanguageContext';
import { useTranslation } from '../translations';

const menuPrices = {
  lunch: ['$42', '$38', '$34', '$28', '$36'],
  dinner: ['$78', '$95', '$85', '$48', '$38'],
  brunch: ['$28', '$52', '$24', '$26', '$22'],
};

const menuDietInfo = {
  lunch: [
    { isVegan: false, isVegetarian: false },
    { isVegan: false, isVegetarian: false },
    { isVegan: false, isVegetarian: true },
    { isVegan: true, isVegetarian: true },
    { isVegan: false, isVegetarian: false },
  ],
  dinner: [
    { isVegan: false, isVegetarian: false },
    { isVegan: false, isVegetarian: false },
    { isVegan: false, isVegetarian: false },
    { isVegan: false, isVegetarian: true },
    { isVegan: true, isVegetarian: true },
  ],
  brunch: [
    { isVegan: false, isVegetarian: false },
    { isVegan: false, isVegetarian: false },
    { isVegan: false, isVegetarian: true },
    { isVegan: true, isVegetarian: true },
    { isVegan: false, isVegetarian: true },
  ],
};

const MenuItem = ({ item, price, dietInfo, isVisible, t }) => (
  <div
    className={`flex justify-between items-start py-6 border-b border-ivory/10 transition-all duration-700 ${
      isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'
    }`}
  >
    <div className="flex-1">
      <div className="flex items-center gap-3">
        <h4 className="font-serif text-xl lg:text-2xl text-ivory">{item.name}</h4>
        {dietInfo.isVegan && (
          <span className="text-green-400" title={t.menu.vegan}>
            <LeafyGreen size={18} />
          </span>
        )}
        {dietInfo.isVegetarian && !dietInfo.isVegan && (
          <span className="text-green-500" title={t.menu.vegetarian}>
            <Leaf size={18} />
          </span>
        )}
      </div>
      <p className="text-ivory/50 mt-2 text-sm lg:text-base">{item.description}</p>
    </div>
    <span className="font-serif text-xl lg:text-2xl text-gold ml-8">{price}</span>
  </div>
);

const MenuSection = () => {
  const [activeTab, setActiveTab] = useState('dinner');
  const [visibleItems, setVisibleItems] = useState([]);
  const sectionRef = useRef(null);
  const { currentLanguage } = useLanguage();
  const t = useTranslation(currentLanguage);

  useEffect(() => {
    setVisibleItems([]);
    const timer = setTimeout(() => {
      menuItems[activeTab].forEach((_, index) => {
        setTimeout(() => {
          setVisibleItems((prev) => [...prev, index]);
        }, index * 150);
      });
    }, 300);
    return () => clearTimeout(timer);
  }, [activeTab]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          menuItems[activeTab].forEach((_, index) => {
            setTimeout(() => {
              setVisibleItems((prev) => [...new Set([...prev, index])]);
            }, index * 150);
          });
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [activeTab]);

  return (
    <section id="menus" ref={sectionRef} className="py-24 lg:py-32 bg-black">
      <div className="max-w-5xl mx-auto px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="text-gold text-sm tracking-[0.4em] uppercase">Culinary Excellence</span>
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-ivory mt-4 tracking-wide">
            Our Menus
          </h2>
          <div className="w-20 h-px bg-gold mx-auto mt-8" />
        </div>

        {/* Menu Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="w-full justify-center gap-2 bg-transparent border-b border-ivory/10 pb-4 mb-12">
            {['lunch', 'dinner', 'brunch'].map((tab) => (
              <TabsTrigger
                key={tab}
                value={tab}
                className={`px-8 py-3 text-sm tracking-[0.3em] uppercase transition-all duration-500 rounded-none border-b-2 ${
                  activeTab === tab
                    ? 'border-gold text-gold bg-transparent'
                    : 'border-transparent text-ivory/50 hover:text-ivory bg-transparent'
                }`}
              >
                {tab}
              </TabsTrigger>
            ))}
          </TabsList>

          {/* Menu Content */}
          {['lunch', 'dinner', 'brunch'].map((tab) => (
            <TabsContent key={tab} value={tab} className="mt-0">
              <div className="space-y-2">
                {menuItems[tab].map((item, index) => (
                  <MenuItem
                    key={item.id}
                    item={item}
                    isVisible={visibleItems.includes(index)}
                  />
                ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>

        {/* Legend and Download */}
        <div className="mt-12 flex flex-col sm:flex-row items-center justify-between gap-6 pt-8 border-t border-ivory/10">
          <div className="flex items-center gap-6 text-sm text-ivory/50">
            <span className="flex items-center gap-2">
              <Leaf size={16} className="text-green-500" />
              Vegetarian
            </span>
            <span className="flex items-center gap-2">
              <LeafyGreen size={16} className="text-green-400" />
              Vegan
            </span>
          </div>
          <Button
            variant="ghost"
            className="text-ivory/50 hover:text-gold hover:bg-transparent text-sm tracking-widest uppercase"
          >
            <Download size={18} className="mr-2" />
            Download Menu
          </Button>
        </div>
      </div>
    </section>
  );
};

export default MenuSection;
