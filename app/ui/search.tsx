'use client';

import { useDebouncedCallback } from 'use-debounce';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { useSearchParams, usePathname, useRouter  } from 'next/navigation';
 
export default function Search({ placeholder }: { placeholder: string }) {
  const searchParams = useSearchParams();
  // step4 pathname, replace 추가
  const pathname = usePathname();
  const { replace } = useRouter();
  
  // step 6 handleSearch를 래핑하여 특정시간 뒤에 코드가 실행되도록 합니다.
  const handleSearch = useDebouncedCallback((term) => {
    // step 1
    // console.log(term, '검색이 되는건가본가나다라');
    
    // step 2 
    // useSearchParams 추가, searchParams 만들어서, 아래 params에 담기
    const params = new URLSearchParams(searchParams);

    // step 6
    // 검색할때마다 pagae 1로 초기화 
    params.set('page', '1');

    // step 3
    if (term) { // 검색어 있으면
      params.set('query', term); // 검색어로 params 변경 -> .set 노션체크!
    } else { // 아니면
      params.delete('query'); // 삭제
    }

    // step 5 pathname으로 바꾸기 
    replace(`${pathname}?${params.toString()}`);

  }, 300);
 
  return (
    <div className="relative flex flex-1 flex-shrink-0">
      <label htmlFor="search" className="sr-only">
        검색
      </label>
      <input
        className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
        placeholder={placeholder}
        onChange={(e) => {
          handleSearch(e.target.value);
        }}
        defaultValue={searchParams.get('query')?.toString()}
      />
      <MagnifyingGlassIcon className="absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
    </div>
  );
}
