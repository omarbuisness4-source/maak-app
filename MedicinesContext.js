import React, { createContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const MedicinesContext = createContext();

export function MedicinesProvider({ children }) {
  const [medicines, setMedicines] = useState([]);

  // 1. أول ما التطبيق يفتح، بنجيب الأدوية المتسجلة من الذاكرة
  useEffect(() => {
    const loadData = async () => {
      try {
        const jsonValue = await AsyncStorage.getItem("@medicines_data");
        if (jsonValue != null) {
          setMedicines(JSON.parse(jsonValue));
        }
      } catch (e) {
        console.log("Error loading data");
      }
    };
    loadData();
  }, []);

  // 2. كل ما قائمة الأدوية تتغير (إضافة/حذف/جرعة)، بنسيفها أوتوماتيك
  useEffect(() => {
    const saveData = async () => {
      try {
        const jsonValue = JSON.stringify(medicines);
        await AsyncStorage.setItem("@medicines_data", jsonValue);
      } catch (e) {
        console.log("Error saving data");
      }
    };
    saveData();
  }, [medicines]);

  // إضافة دواء
  const addMedicine = (medicine) => {
    setMedicines((prev) => [...prev, medicine]);
  };

  // حذف دواء ✅
  const deleteMedicine = (id) => {
    setMedicines((prev) => prev.filter((m) => m.id !== id));
  };

  // أخذ الجرعة
  const takeDose = (id, todayIndex) => {
    setMedicines((prev) =>
      prev.map((m) => {
        if (m.id !== id) return m;
        if (m.takenToday >= m.doses) return m;

        const weekCopy = [...m.week];
        weekCopy[todayIndex] = true;

        return {
          ...m,
          takenToday: m.takenToday + 1,
          week: weekCopy,
        };
      })
    );
  };

  return (
    <MedicinesContext.Provider
      value={{ medicines, addMedicine, deleteMedicine, takeDose }}
    >
      {children}
    </MedicinesContext.Provider>
  );
}